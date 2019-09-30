/*
*
*
*       Complete the handler logic below
*       
*       
*/

const splitInput = (input) => {
    // Method 1: regex
    // var result = input.match(/[a-zA-Z]+|[\d\(\)\+\-\*\/*\.]+/ig)
  
    // Method 2: identify the index of the first alphabetic character
    var first_alphab = input.search(/[a-zA-Z]/)
    var magnitude = null, unit = null
    
    // Check if there are alphabetic characters
    if(first_alphab !== -1)       
      unit = input.slice(first_alphab).toLowerCase()
      
    // Check if there are numeric characters
    if(first_alphab === 0 && unit) {
      
      // One parameter given: the unit
      magnitude = 1
      
    } else if(first_alphab > 0) {
      // Two parameters given
      
      try {
        magnitude = eval(input.slice(0, first_alphab))  
    
        // Don't allow double fraction (//)
        if(input.slice(0, first_alphab).includes('//'))
          magnitude = null
        
      } catch {
        
      }
    }

    return { magnitude, unit }
}

const unitPairs = { gal: "l", lbs: "kg", mi: "km" }
const unitConversion = { gal: 3.78541, lbs: 0.453592, mi: 1.60934 }
const unitNames = { gal: "gallons", l: "liters", lbs: "pounds", kg: "kilograms", mi: "miles", km: "kilometers" }

function ConvertHandler() {  
  
  this.getNum = function(input) {
    //console.log(input, splitInput(input))
    return splitInput(input).magnitude
  };
  
  this.getUnit = function(input) {
    var unit = splitInput(input).unit;
    if(Object.keys(unitPairs).includes(unit) || Object.values(unitPairs).includes(unit)) {
      return unit
    } else {
      return null
    }
  };
  
  this.getReturnUnit = function(initUnit) { 
    if(!initUnit)
      return null
    
    var lowerInitUnit = initUnit.toLowerCase()
    if(Object.keys(unitPairs).includes(lowerInitUnit)) {
      return unitPairs[lowerInitUnit]
    } else if(Object.values(unitPairs).includes(lowerInitUnit)) {
      return Object.keys(unitPairs).filter(v => unitPairs[v] === lowerInitUnit)[0]
    } else {
      return null
    }    
  };

  this.spellOutUnit = function(unit) {
    return unitNames[unit]
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if(!initNum || !initUnit)
      return null
    
    var lowerInitUnit = initUnit.toLowerCase()
    
    if(Object.keys(unitPairs).includes(lowerInitUnit)) {
      return initNum * unitConversion[lowerInitUnit]
    } else if(Object.values(unitPairs).includes(lowerInitUnit)) {
      var baseUnit = Object.keys(unitPairs).filter(k => unitPairs[k] === lowerInitUnit)[0]
      return initNum / unitConversion[baseUnit]
    } else {
      return null
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if(initNum && initUnit && returnNum && returnUnit)
      return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum.toFixed(5) + " " + this.spellOutUnit(returnUnit);
    return null
  };
  
}

module.exports = ConvertHandler;