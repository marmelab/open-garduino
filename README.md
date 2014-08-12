# Open Garduino

This repository provides all the necessary tools to create an advanced monitoring system for your plantations. Check
the earth humidity, light reception and temperature to make your green buddies feel much better!

## Circuit

```
+5V                     GND
 │                       │
 ├──────┬─[TMP36]─┬──────┤
 │      │         │      │
 │      └───┤├────┘      │
 │         100 nF        │
```

As explained in the [TMP36 temperature sensor datasheet](http://www.gotronic.fr/pj-883.pdf), you have to plug a capacitor of 100nF in order to get a stable output voltage. Otherwise, even 10cm of wire would lead to irrational values.

## Server setup

``` sh
cd server
sudo npm install
```

## Web UI setup

```
sass ui/sass/style.scss > ui/style.css
```
