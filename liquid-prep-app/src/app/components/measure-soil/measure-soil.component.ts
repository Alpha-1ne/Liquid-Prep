import {AfterViewInit, Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { USBAdapter,USB, USBOptions, usb } from 'webusb';
import {SoilMoistureService} from '../../service/SoilMoistureService';
import {SoilMoisture} from '../../models/SoilMoisture';
//import { serial } from 'serialport';
//import { SerialPort, SerialOptions } from "./serial";
import * as serialport  from 'serialport';

@Component({
  selector: 'app-measure-soil',
  templateUrl: './measure-soil.component.html',
  styleUrls: ['./measure-soil.component.scss'],
})
export class MeasureSoilComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private location: Location, private soilService: SoilMoistureService) { }

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: false,
      hideOnClick: false,
    },
    longSwipesRatio: 0.1,
    longSwipesMs: 100,
    threshold: 5,
  };

  public index = 0;
  public disabled = false;
  public countdownSecond = 5;
  public measureView: 'before-measuring' | 'measuring' | 'after-measuring' = 'before-measuring';
  private interval;
  public soilData: SoilMoisture;
  //public device: USBDevice;
  //public serialPort = undefined;

  

  ngOnInit(): void { 
    //this.serialPort = new SerialPort;

  }

  ngAfterViewInit(): void {
  }

  /*async connectSerial() {
    try {
      const port = await navigator.serial.requestPort({
        filters: [{vendorId: 0x2341}]
        /* filters: [
            {
              vendorId: 0x0403, // FTDI
              productId: 0x6001,
            },
          ],*/
     /* });
      console.log("port", port);
      console.log("port info", port.getInfo());

      await port.open({
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: "none"
      });

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      let i = 0;

      while (true) {
        const { value, done } = await reader.read();
        i++;
        if (done) {
          // |reader| has been canceled.
          console.log("stop", done);
          break;
        }
        if (value) {
          // Do something with |value|...
        }
      }

      reader.releaseLock();
    } catch (error) {
      console.log(error);
    }
  }*/

  public onSensorConnect(){
    /*const serialport = require('serialport')
    let SerialPort = serialport.SerialPort;

    const Readline = SerialPort.parsers.Readline;
      let port = new SerialPort("COM5", {
      baudRate: 9600,
      parser: new Readline("\n")
    });

    port.on('open', fn => {
    console.log('serial port open')
    })

    port.on('data', data => {
    console.log(data.toString('utf8'));
    const value = data.toString('utf8'); 
    console.log('port data: ', value)
  })*/

    const filter = {
      usbVendorId: 0x2341 // Arduino SA
    };
    //window.navigator.
    let device;
    window.navigator.usb.requestDevice({filters: [{vendorId: 0x2341}]})
    .then(usbDevice => {
      // dialogRef.close();
      device = usbDevice;
      device.open().then(data => {
        console.log('data: ',data)
      });
      //console.log('device: ',device)
      //return device.open();
      

    

    
      //usbDevice.controlTransferOut
      //this.setMeasureView('measuring');
      //this.readingCountdown(5);
    })
    /*.then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
    .then(() => device.claimInterface(1)) // Request exclusive control over interface #2.
    .then(() => device.controlTransferOut({
      requestType: 'class',
      recipient: 'interface',
      request: 0x22,
      value: 0x01,
      index: 0x02})) // Ready to receive data
    .then(() => device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.
    .then(result => {
      const decoder = new TextDecoder();
      console.log('Received: ' + decoder.decode(result.data));
    })*/
    .catch(e => {
      console.log('error: ',e);
      // dialogRef.close();
    });

    //const port = navigator.serial.requestPort({ filters: [filter] });

    /*const port = SerialPort.('/dev/tty-usbserial1', {
      baudRate: 9600
    })*/

    /*var serialport = require("serialport");
    var SerialPort = serialport.SerialPort;

    var sp = new SerialPort("/dev/ttyACM0", {
      baudrate: 9600,
      parser: serialport.parsers.readline("\n")
    });

    sp.on('open', function() {
    // execute your functions
      sp.on('data', function(data){
        console.log(data); 
      });
    });*/

    //this.connectSerial();

   /* try {
      //const port = navigator.serial.requestPort({filters: [filter]});
      const port = this.serialPort.requestPort({filters: [filter]}).then(r => {
        console.log('r: ',r)
      });
      //const port = serial.requestPort({filters: [filter]});
      // Continue connecting to |port|.
      port.open({ baudRate: 9600 });
    } catch (e) {
      // Permission to access a device was denied implicitly or explicitly by the user.
      console.log('Permission to access a device was denied implicitly or explicitly by the user. ', e)
    }*/
    // const dialogRef = this.dialog.open(ConnectingDialogComponent, {
    //   panelClass: 'myapp-no-padding-dialog',
    //   data: {}
    // });
    // console.log(window.navigator.usb.getDevices());
    
    /*window.navigator.usb.requestDevice({filters: [{vendorId: 0x2341}]})
      .then(usbDevice => {
        // dialogRef.close();
        this.device = usbDevice;
        console.log('product name: ',usbDevice);      // "Arduino Micro"
        console.log(' product llc: ',usbDevice.); // "Arduino LLC"
        

        /*this.setMeasureView('measuring');
        this.readingCountdown(5);*/

        /*usbDevice.open(result => {

        });
        usbDevice.selectConfiguration(1);
        usbDevice.transferIn(5,64);
        //usbDevice.transferOut()
      })
      /*.then(() => this.device.selectConfiguration(1)) // Select configuration #1 for the device.
      .then(() => this.device.claimInterface(1)) // Request exclusive control over interface #2.
      .then(() => this.device.controlTransferOut({
        requestType: 'class',
        recipient: 'interface',
        request: 0x22,
        value: 0x01,
        index: 0x02})) // Ready to receive data
      .then(() => this.device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.*/
      /*.then(result => {
        const decoder = new TextDecoder();
        console.log('Received 2222: ' + decoder.decode(result));
        console.log('Received: ' + decoder.decode(result.data));
      })*/
      /*.catch(e => {
        console.log('error ',e);
        // dialogRef.close();
      });*/
  }

  public onIndexChange(index: number): void { }

  public onSwiperEvent(event: string): void { }

  public volumeClicked() {
  }

  public backClicked() {
    this.clearCountdown();
    if (this.measureView === 'before-measuring') {
      this.location.back();
    } else {
      this.measureView = 'before-measuring';
    }
  }

  public readingCountdown(seconds: number){
    this.countdownSecond = seconds;
    this.interval = setInterval(() => {
      if (this.countdownSecond <= 0){
        this.setMeasureView('after-measuring');
        clearInterval(this.interval);
        this.soilData = this.soilService.getSoilMoistureReading();
      }
      this.countdownSecond--;
    }, 1000);
  }

  private clearCountdown(){
    clearInterval(this.interval);
  }

  public setMeasureView(status: 'before-measuring' | 'measuring' | 'after-measuring'){
    this.measureView = status;
  }

  onGetAdvise() {
    this.router.navigate(['advice']).then(r => {});
  }
}
