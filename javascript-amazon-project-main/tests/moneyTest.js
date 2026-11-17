import{formatecurrency} from '../Scripts/utils/money.js'; 


console.log('test suite: formatecurrencys');

console.log('converts into dollers');
if(formatecurrency(1276) === '12.76'){      // basic test case 
    console.log('passed');
}else{
    console.log('failed');
}

console.log('works with zero');
if(formatecurrency(0) === '0.00'){           // edge test case
    console.log('passed');
}else{
    console.log('failed')
}

console.log('rounds up to the the nearest cent');
if(formatecurrency(2000.5) === '20.01'){   // edge test case
    console.log('passed')
}else{
    console.log('failed')
}