/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  AccessoryPlugin,
  CharacteristicGetCallback,
  CharacteristicSetCallback,
  CharacteristicValue,
  HAP,
  Logging,
  Service,
  CharacteristicEventTypes,
} from "homebridge";
import {
  MqttClient
} from "mqtt";
import { hostname } from "os";

export class Meter implements AccessoryPlugin {
  private readonly log: Logging;
  private readonly bleMac: string;
  private readonly scanDuration: number;
  private readonly scanInterval: number;

  private temperature: number = 0;
  private humidity: number = 0;

  // This property must be existent!!
  name: string;

  private readonly temperatureService: Service;
  private readonly humidityService: Service;
  private readonly informationService: Service;
  private readonly historyService: any;

  constructor(hap: HAP, mqtt: MqttClient, history: any, log: Logging, name: string, bleMac: string, scanDuration: number, scanInterval: number) {
    this.log = log;
    this.name = name;
    this.bleMac = bleMac;
    this.scanDuration = scanDuration;
    this.scanInterval = scanInterval;

    this.temperatureService = new hap.Service.TemperatureSensor(name);
    this.temperatureService
      .getCharacteristic(hap.Characteristic.CurrentTemperature)
      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {
        //log.info(name + " current temperature: " + this.temperature + "\u2103");
        //callback(undefined, this.temperature < 0 ? 0 : this.temperature > 100 ? 100 : this.temperature);
        callback(undefined, this.temperature);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
        log.info("The temperature of the Meter can't be set!");
        callback();
      });

    this.humidityService = new hap.Service.HumiditySensor(name);
    this.humidityService
      .getCharacteristic(hap.Characteristic.CurrentRelativeHumidity)
      .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {
        //log.info(name + " current humidity: " + this.humidity + "%");
        callback(undefined, this.humidity);
      })
      .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
        log.info("The humidity of the Meter can't be set!");
        callback();
      });

    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, "SwitchBot")
      .setCharacteristic(hap.Characteristic.Model, "SWITCHBOT-METERTH-S1")
      .setCharacteristic(hap.Characteristic.SerialNumber, this.bleMac);

    log.info(name, "scanDuration:" + this.scanDuration.toString() + "ms", "scanInterval:" + this.scanInterval.toString() + "ms");

    //this.historyService = new history('room', this, {log: this.log, storage: 'fs', displayName: `${this.bleMac}`});
    this.historyService = new history('room', this,
				      {log: this.log, storage: 'fs',
				       filename: `${hostname().split(".")[0]}_${this.bleMac}_persist.json`
				      });
    
    const Switchbot = require("node-switchbot");
    const switchbot = new Switchbot();

    switchbot.onadvertisement = (ad: any) => {
      // log.info(JSON.stringify(ad, null, '  '));
      // log.info("Temperature:", ad.serviceData.temperature.c);
      // log.info("Humidity:", ad.serviceData.humidity);
      // log.info(this.bleMac, "Temperature:", ad.serviceData.temperature.c, "Humidity:", ad.serviceData.humidity);
      if (ad.serviceData.humidity > 0) {
	this.temperature = ad.serviceData.temperature.c;
	this.humidity = ad.serviceData.humidity;
	mqtt.publish(`homebridge-switchbot-ble/${this.bleMac}`,
		     `{"temperture":${this.temperature},"humidity":${this.humidity},"battery":${ad.serviceData.battery}}`
		    );
	this.historyService.addEntry(
	  {time: Math.round(new Date().valueOf()/1000),
	   temp: this.temperature,
	   humidity: this.humidity});
      } else {
	log.error(`Unreliable measurement values of ${this.bleMac}. Temperature:${ad.serviceData.temperature.c} Humidity:${ad.serviceData.humidity}`);
      }
    };

    switchbot
      .startScan({
        id: bleMac,
      })
      .then(() => {
        return switchbot.wait(this.scanDuration);
      })
      .then(() => {
        switchbot.stopScan();
      })
      .catch((error: any) => {
        log.error(error);
      });

    setInterval(() => {
      // log.info("Start scan " + name + "(" + bleMac + ")");
      switchbot
        .startScan({
          // mode: 'T',
          id: bleMac,
        })
        .then(() => {
          return switchbot.wait(this.scanDuration);
        })
        .then(() => {
          switchbot.stopScan();
          // log.info("Stop scan " + name + "(" + bleMac + ")");
        })
        .catch((error: any) => {
          log.error(error);
        });
    }, this.scanInterval);
  }

  /*
   * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
   * Typical this only ever happens at the pairing process.
   */
  identify(): void {
    this.log.info("Identify!");
  }

  /*
   * This method is called directly after creation of this instance.
   * It should return all services which should be added to the accessory.
   */
  getServices(): Service[] {
    return [this.informationService,
	    this.temperatureService,
	    this.humidityService,
	    this.historyService];
  }
}
