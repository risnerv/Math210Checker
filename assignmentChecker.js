//this files store the main computation and comparison functions 
//needed for the assignemnet checker. it also houses the functions to generate datasets

//import PRNG from PRNG.js;
//function prototypes
/*
//function to take in a seedvalue and dataset and returns 
// all the datasets for the specific combination 
function getDataset(seedvalue, dataSet)

//  Take in the size, mean and standard deviation and create a normal
//  distribution that meets the specified mean, standard deviation and size
function 1varNormalDisGen(n, mu, sd)

// Takes in the size, mean, standard deviation and a flux for each.
// Then the generator will a one variable normal distribution with a 
// mean, standard deviation and size within the flux range for each.
function gen1VarSpecificSet(size, sizeFlux, mean, meanFlux, SD, SDFlux)

// Takes in the mean and standard deviation of 2 sets and the correlation
// between those sets. The function returns an ordered pair of points with
// those specified requirement
function 2varNormalDisGen(mu1, sd1, mu2, sd2, cor)

// Takes in the specified mean and standard deviation and 
// flux range for each, for 2 datasets. Takes in the size 
// and correlation desired as well as the correlation flux 
// range. Finally takes in the output arrays for X and Y.
// The function uses 2varNormalDisGen and generates 2 dataset 
// with the specifed requirments within the specified flux ranges
function gen2VarSpecificSet(size, mu1, mu1Flux, sd1, sd1Flux, mu2, 
    mu2Flux, sd2, sd2Flux, cor, corFlux, outputX, outputY)

//generates a set of score, Temp/KWH, Production line, Test 1 Test 2, and Mice data
function genAllDataSet()

// takes in an array and calculates and returns the mean
function calcMean(ray)

// takes in an array and calculates and returns the Standard Deviation
function calcSD(ray)

// Takes in 2 arrays and the length of the arrays.
// Then calculates and returns the correlation between the 2 arrays
function calcCorrelation(ray, arr, len)

// takes in an array and calculates the median of the array
function calcMedian(ray)

// takes in an array and a percentile and then 
// calculates the precentile for that array
function calcPrecentile(ray, percent)

//Takes in an X data set and a Y data set 
// then calculates the regression equation 
function calcRegression(xdata, ydata)

//takes in an array and calculates the 
// confidence interval of the mean at 95%
function confMean95(ray)

// Takes in an X data set and a Y data set and calculates 
// the confidence interval of the slope at the 95% confidence level
function confReg95(xdata, ydata)

//return the validation code
function validCode(sv, assignment)

//function designed to read in values of assignment one, 
// compare to correct answers and return a boolean array
function assignment1()

//return the correct answer for assignment 1 with dataset number and seedvalue
function assignment1answers(dataSet, seedvalue)

//function designed to read in values of assignment two, 
// compare to correct answers and return a boolean array
function assignment2()

//function to return correct answers for 
// assignment 2 for a specific dataset and seedvalue
function assignment2answers(dataSet, seedvalue)

//function designed to read in values of assignment one, 
// compare to correct answers and return a boolean array
function assignment3()

//function to return correct answers for 
// assignment 3 for a specific dataset and seedvalue
function assignment3answers(dataSet, seedvalue)*/

//declare univseral variables
decP = 1e4; 
let seedValue; 
let scoreData = []; 
let kwhXData = []; 
let kwhYData = []; 
let prod1Data = []; 
let prod2Data = []; 
let prod3Data = []; 
let t1Data = []; 
let t2Data = []; 
let miceData = []; 
let dataSet = 0; 
let normalDist = []; 


//function to take in a seedvalue and dataset and returns all the 
// datasets for the specific combination 
function getDataset(seedvalue, dataSet)
{
    seedValue = seedvalue;
// clear storage
    scoreData = [];
    kwhXData = [];
    kwhYData = [];
    prod1Data = [];
    prod2Data = [];
    prod3Data = [];
    t1Data = [];
    t2Data = [];
    miceData = [];
   //create new instance of the random number generator
    prng = new PRNG(seedvalue);

    //Call the function to generate all the datasets
    genAllDataSet(); 
    
    //return string of formated datasets and labels
    let returnString = ("Data Set Number: \n" + dataSet +
        "\n\nScore Data: \n" + scoreData +
       "\n\nTemp KWH Data: \n" + kwhXData + "\n" + kwhYData +
       "\n\nProduction Line Data: \n" + prod1Data + "\n" + prod2Data + "\n" + prod3Data +
       "\n\nTest 1 Test 2 Data: \n" + t1Data + "\n" + t2Data +
       "\n\nMice Data: \n" + miceData[0] + " of 50 Vaccinated mice got the disease.\n" + miceData[1] + " of 50 Unvaccinated mice got the disease.") 

    return returnString;

    //return "something"; 
}

//  Take in the size, mean and standard deviation and create a normal
//  distribution that meets the specified mean, standard deviation and size
function OnevarNormalDisGen(n, mu, sd)
{
    let normalDist =[];
    // generates n data point
    for(i = 0; i<n ; i++)
    {
        datapoint = 0;
        // generates 12 random numbers calculates the average
        for(j = 0; j<12; j++)
        {
            datapoint = datapoint + prng.next()-1/2;
        }
        //multiple the point by the SD and add the mean
        normalDist.push(Math.round(datapoint * sd + mu)); 
    }

    //returns the distribution
    return normalDist; 

}

// Takes in the size, mean, standard deviation and a flux for each.
// Then the generator will a one variable normal distribution with a 
// mean, standard deviation and size within the flux range for each.
function gen1VarSpecificSet(size, sizeFlux, mean, meanFlux, SD, SDFlux)
{
    // generates the size, mean, and standard deviation with in the specifed range
    size = (seedValue * 7 % (2*sizeFlux)) - sizeFlux + size;
    mean = (seedValue * 7 % (2*meanFlux)) - meanFlux + mean;
    SD = (seedValue * 7 % (2*SDFlux)) - SDFlux + SD;
    
    // calls the normal distribution generator and returns a normal
    // distribution with the generated size, mean, and standard deviation
    return OnevarNormalDisGen(size, mean, SD);
}

function gen1VarSpecificSetNosizeFlux(size, mean, meanFlux, SD, SDFlux)
{
    // generates the size, mean, and standard deviation with in the specifed range
    mean = (seedValue * 7 % (2*meanFlux)) - meanFlux + mean;
    SD = (seedValue * 7 % (2*SDFlux)) - SDFlux + SD;
    
    // calls the normal distribution generator and returns a normal
    // distribution with the generated size, mean, and standard deviation
    return OnevarNormalDisGen(size, mean, SD);
}

// Takes in the mean and standard deviation of 2 sets and the correlation
// between those sets. The function returns an ordered pair of points with
// those specified requirement
function TwovarNormalDisGen(mu1, sd1, mu2, sd2, cor)
{
    xdatapoint = 0;
    ydatapoint = 0;

    // generates and takes the average or 12 random numbers
    // for both x and y values
    for(j= 0; j<12; j++)
    {
        xdatapoint = xdatapoint + prng.next()-1/2; 
        ydatapoint = ydatapoint + prng.next()-1/2;
    }

    // adjust the pair of point to the specified means, sd's and correlation
    ydatapoint = xdatapoint * cor + ydatapoint * (Math.sqrt(1 - cor * cor));
    xdatapoint = xdatapoint * sd1 + mu1;
    ydatapoint = ydatapoint * sd2 + mu2;

    // returns the pair of point
    return [xdatapoint, ydatapoint];

}

// Takes in the specified mean and standard deviation and 
// flux range for each, for 2 datasets. Takes in the size 
// and correlation desired as well as the correlation flux 
// range. Finally takes in the output arrays for X and Y.
// The function uses 2varNormalDisGen and generates 2 dataset 
// with the specifed requirments within the specified flux ranges
function gen2VarSpecificSet(size, mu1, mu1Flux, sd1, sd1Flux, mu2, 
    mu2Flux, sd2, sd2Flux, cor, corFlux, outputX, outputY)
{
    // generates the mean, and standard deviation with in the 
    // specifed range for both the x and y datasets. Generates 
    // the correlation with the correlation flux range
    mu1 = (seedValue * 7 % (2*mu1Flux)) - mu1Flux + mu1;
    mu2 = (seedValue * 7 % (2*mu2Flux)) - mu2Flux + mu2;
    sd1 = (seedValue * 7 % (2*sd1Flux)) - sd1Flux + sd1;
    sd2 = (seedValue * 7 % (2*sd2Flux)) - sd2Flux + sd2;
    cor = ((seedValue * 7 % (2*corFlux*100)) - corFlux*100)/100 + cor;

    // for index from 0 to the size generates the pair of datapoints 
    // with the generated means, standard deviations, and correlation
    for(i=0; i<size; i++)
    {
        // calls 2varNormalDisGen and generates a pair of data points 
        // with the generated means, standard deviations, and correlation
        dataPairs = TwovarNormalDisGen(mu1, sd1, mu2, sd2, cor);
        outputX.push(Math.round(dataPairs[0]));
        outputY.push(Math.round(dataPairs[1]));
    }
}

function gentestdata(size, mean, meanFlux, SD, SDFlux)
{
    // generates the size, mean, and standard deviation with in the specifed range
    mean = (seedValue * 7 % (2*meanFlux)) - meanFlux + mean;
    SD = (seedValue * 7 % (2*SDFlux)) - SDFlux + SD;
    
    // calls the normal distribution generator and returns a normal
    // distribution with the generated size, mean, and standard deviation
    t1Data = OnevarNormalDisGen(size, mean, SD);
    //make sure the t1 data is not too large
    for(i=0;i<t1Data.length; i++)
    {
        if(t1Data[i]>100)
        {
            for(j=0;j<t1Data.length;j++)
            {
                t1Data[j]= t1Data[j]-SD;
            }
            i=0;
        }
    }
    //generate t2data
    t2Data = OnevarNormalDisGen(size, 3, 4);
    for(i=0;i<t2Data.length;i++)
    {
        t2Data[i] = t2Data[i] + t1Data[i]
    }
    //make sure t2data is not too large
    for(i=0;i<t2Data.length; i++)
        {
            if(t2Data[i]>100)
            {
                for(j=0;j<t2Data.length;j++)
                {
                    t2Data[j]= t2Data[j]-4;
                }
                i=0;
            }
        }

    
}
//generates a set of score, Temp/KWH, Production line, Test 1 Test 2, and Mice data
function genAllDataSet()
{

    // calls gen1VarSpecificSet to generate score data
    scoreData = gen1VarSpecificSet(38, 3, 78, 2, 4, 0.5);
    // generates and stores the kwhXData and kwhYData using gen2VarSpecificSet
    gen2VarSpecificSet(20, 29, 2, 5.5, 1.5, 63, 3, 4, 2, .8, .15, kwhXData, kwhYData);
    // calls gen1VarSpecificSet to generate prod1Data
    prod1Data = gen1VarSpecificSetNosizeFlux(6, 63, 2, 5, 1);
    // calls gen1VarSpecificSet to generate prod2Data
    prod2Data = OnevarNormalDisGen(6, 3, 4);
    for(i=0;i<6;i++)
    {
        prod2Data[i] = prod2Data[i] + prod1Data[i];
    }
    // calls gen1VarSpecificSet to generate prod3Data
    prod3Data = OnevarNormalDisGen(6,3,4);
    for(i=0;i<6;i++)
    {
        prod3Data[i] = prod3Data[i] + prod2Data[i];
    }
    // calls gen1VarSpecificSet to generate testData
    gentestdata(10, 70, 1, 5, 1);
    miceData = [7 + prng.nextInt(-3,3), 13 + prng.nextInt(-3,3)];
}

// takes in an array and calculates and returns the mean
function calcMean(ray){
    avg = 0 
    // for each value in the ray add to the avg value
    for(i = 0; i < ray.length; i++)
    {
        avg = avg + ray[i]; 
    }

    //returns the average
    return avg / ray.length;
}

// takes in an array and calculates and returns the Standard Deviation
function calcSD(ray){
    // calls calcMean to calculate the mean of the array
    let mean = calcMean(ray); 
    let SD = 0;
    
    //for each value in the array find the difference between 
    // the mean and the datapoint, square the value and adds to SD
    for(i = 0; i < ray.length; i++) 
    {
        SD = SD + (Math.pow((mean - ray[i]), 2)); 
    }
    // last steps in calculating the standard deviation
    SD = SD / (ray.length - 1); 
    return Math.sqrt(SD); 
}

// Takes in 2 arrays and the length of the arrays.
// Then calculates and returns the correlation between the 2 arrays
function calcCorrelation(ray, arr, len)
{
   //calc covariance
   let meanRay = calcMean(ray);
   let meanarr = calcMean(arr);
   let covar = 0;
   //at each index in our array calculate the individual 
   //covariance and add to the total covariance
   for(i = 0; i < len; i++)
   {
       covar = covar + ((ray[i] - meanRay) * (arr[i] - meanarr)); 
   }
   
   // divid our sum by one less than the number of datapoints
   covar = covar / (ray.length - 1);
   
   //calculate the SD of ray
   let raySD = calcSD(ray); 
   //calc the SD of arr
   let arrSD = calcSD(arr); 

   //calc correlation
   return covar/(raySD * arrSD); 
}

// takes in an array and calculates the median of the array
function calcMedian(ray)
{
    let copy = ray.slice();
    let sorted = [];
    let x0 = copy[0];
    let index = 0;
    let current = 0;
    let sort = false;

    //repeat until the array is sorted
    while (sort == false)
        {
            //take the next index not sorted 
            x0 = copy[0];
    
            //compare each value left in the copy array
            for(let i = 0; i < copy.length; i++)
            {
                // the copy array is smaller than our comparison
                // make the comparison the value at that index
                if (copy[i]<x0)
                {
                    x0 = copy[i];
                    index = i;
                }
            }
            //comparison value is now in our sorted list
            sorted[current] = x0;
            //move our point up one
            current++;
            //move all of our values past our index over one
            for(let j = index; j < copy.length-1; j++)
            {
                copy[j]=copy[j+1];
            }
            copy.pop();
            //check to see if there is anything left to compare
            if (copy.length<1)
                sort = true;
        }
    //if copy length is even, calc the average of the 2 points
    if(sorted.length % 2 == 0)
        return (sorted[sorted.length/2]+sorted[(sorted.length-2)/2])/2;
    //if copy length is odd, find the middle
    else
        return sorted[(sorted.length-1)/2];
}

// takes in an array and a percentile and then 
// calculates the precentile for that array
function calcPrecentile(ray, percent)
{

    //create a copy
    let copy = ray.slice();
    //create empty sorted list
    let sorted = [];

    //as long as there is some left to sort keep sorting
    while (copy.length > 0) {
        //location of current sorted value and starting value
        let x0 = copy[0];
        let index = 0;
        //compare one value to all values left in the array
        for (let i = 0; i < copy.length; i++) {
            if (copy[i] < x0) {
                x0 = copy[i];
                index = i;
            }
        }
        //add the next sorted value to the list
        sorted.push(x0);
        //move everything over
        for (let j = index; j < copy.length - 1; j++) {
            copy[j] = copy[j + 1];
        }
        //remove excess
        copy.pop();
    }

    //calculations for precentils
    let pos = (sorted.length + 1) * percent;

    if (Number.isInteger(pos)) {
        return sorted[pos - 1]; // no interpolation needed
    }

    //exeptions
    if (pos < 1) return sorted[0];
    if (pos > sorted.length) return sorted[sorted.length - 1];
    //further calculations
    let lower = Math.floor(pos) - 1;
    let upper = lower + 1;
    let frac = pos - Math.floor(pos);

    return sorted[lower] + frac * (sorted[upper] - sorted[lower]);
}

//Takes in an X data set and a Y data set 
// then calculates the regression equation 
function calcRegression(xdata, ydata)
{
    //call calcMean to calculate means for x and y data
    meanX = calcMean(xdata);
    meanY = calcMean(ydata);
    covarXY = 0;
    covarXX = 0;
    // at each data pair calc the covarXY and covarXX and add to corresponding sums
    for(i = 0; i < xdata.length; i++)
    {
        covarXY = covarXY + ((xdata[i] - meanX) * (ydata[i] - meanY));
        covarXX = covarXX + ((xdata[i] - meanX) * (xdata[i] - meanX));
    }
    //slope, intercept
    return[(covarXY/covarXX), meanY - meanX * (covarXY/covarXX)];
}

//takes in an array and calculates the 
// confidence interval of the mean at 95%
function confMean95(ray)
{
   let tvalue=0;

    //find the correct t value basesd on the length of the array
    switch(ray.length){
       //array is 30
        case 30:
            tvalue = 2.045229642;
            break;
        //array is 31
        case 31:
            tvalue = 2.042272456;
            break;
        //array is 32
        case 32:
            tvalue = 2.039513446;
            break;
        //array is 33
        case 33:
            tvalue = 2.036933343;
            break;
        //array is 34
        case 34:
            tvalue = 2.034515297;
            break;
        //array is 35
        case 35:
            tvalue = 2.032244509;
            break;
        //array is 36
        case 36:
            tvalue = 2.030107928;
            break;
        //array is 37
        case 37:
            tvalue = 2.028094001;
            break;
        //array is 38
        case 38:
            tvalue = 2.026192463;
            break;
        //array is 39
        case 39:
            tvalue = 2.024394164;
            break;
        //array is 40
        case 40:
            tvalue = 2.02269092;
            break;
    }

    //use the tvalue and multiple by the 
    //SD and divid by square root of the length of the array
    return tvalue * calcSD(ray) / Math.sqrt(ray.length);
}

// Takes in an X data set and a Y data set and calculates 
// the confidence interval of the slope at the 95% confidence level
function confReg95(xdata, ydata)
{
    let slopeErr = 0;
    let meanX = calcMean(xdata);
    let predY = [];
    let reg = calcRegression(xdata, ydata);

    //calculate the predicted value for each X input
    for(i = 0; i < xdata.length; i++)
    {
        predY[i] = reg[0] * xdata[i] + reg[1];
    }
    let sumx = 0;
    let sumy = 0;
    //calc the sum x and the sum y for each data point
    for(i = 0; i < xdata.length; i++)
    {
        sumx = sumx + (xdata[i] - meanX) * (xdata[i] - meanX);
        sumy = sumy + (ydata[i] - predY[i]) * (ydata[i] - predY[i]);
    }
    //calcuate the slope error
    slopeErr = sumy / (18 * sumx);
    slopeErr = Math.sqrt(slopeErr); 

    //Multiple times t-value
    slopeErr = slopeErr*2.10092204;
    return slopeErr;
}

//return the validation code
function validCode(sv, assignment)
{
    validationCode = new PRNG(sv);  

    for(i = 1; i<assignment; i++)
    {
        validationCode.nextInt(10000,99999);
    }

    return validationCode.nextInt(10000,99999);
}

//returns sample variance
function calcSamVar(ray)
{
    return Math.pow(calcSD(ray),2);
}

//returns t-stat for one sample hypoth test
function oneSamHypothTstat(ray, num)
{    
    //get ray data
    let raymean = calcMean(ray);
    let rayVar = calcSamVar(ray);
    let raysize = ray.length;

    return (raymean - num)/Math.sqrt(rayVar/raysize);
}

//return the p-valye for a one sample hypoth test
function oneSamHypothPvalue(ray, num)
{
    //Degrees of freedom
    let degF = ray.length - 1;
    let testStat = oneSamHypothTstat(ray, num);

    return (1 - jStat.studentt.cdf(Math.abs(testStat), degF));
}

//return the number of occurance in array less than comparison
function countLess(ray , num)
{
    let count = 0;
    for(let i = 0; i<ray.length; i++)
    {
        if(ray[i]<num)
            count++;
    }
    return count;
}

//returns the factorial of a number
function factorial(num)
{
    let fact = 1;
    for(let i = 1; i<=num; i++)
        fact = fact * i;
    return fact;
}

//return the number of occurance in array less than comparison
function countMore(ray, num)
{
    let count = 0;
    for(let i = 0; i<ray.length; i++)
    {
        if(ray[i]>num)
            count++;
    }
    return count;
}

//return binomial distribution
function binomialDis(suc, trial, prob)
{
    let choose = factorial(trial)/(factorial(suc)*factorial(trial-suc));

    let successes= Math.pow(prob,suc);
    let failures = Math.pow(1-prob, trial-suc);

    return choose*successes*failures;

}

//cumulative binomial distribution
function cumbinomialDis(suc, trial, prob)
{
    let sum =0;
    for(i=0; i<= suc; i++)
    {
        sum = sum + binomialDis(i,trial,prob);
    }
    return sum;
}


//T-test for paired means
function TtestPairedMeans(ray, arr)
{
    let meanDiff = 0;
    let SDdiff = 0;
    let Ttest = 0;

    for(i=0; i<ray.length; i++)
    {
        meanDiff = ray[i]-arr[i] + meanDiff;
    }
    meanDiff = meanDiff/ray.length;

    for(i=0; i<ray.length; i++)
    {
        SDdiff = Math.pow(ray[i]-arr[i] - meanDiff,2) + SDdiff;
    }

    SDdiff = SDdiff / (ray.length-1);

    SDdiff = Math.sqrt(SDdiff);


    Ttest = meanDiff/(SDdiff/Math.sqrt(ray.length));

    return Ttest;
}

//p-value for paired means
function pvalPairedMeans(ray, arr)
{
    let df = ray.length - 1;
    let pValue = (1 - jStat.studentt.cdf(Math.abs(TtestPairedMeans(ray, arr)), df));

    return pValue;
}
//counts the number of difference bewteen pair ray and arr greater than 0
function countGreaterDifference(ray, arr)
{
    let count = 0;

    for(i=0; i<ray.length; i++)
    {
        if (ray[i]-arr[i]>0)
            count++;
    }
    return count;
}

//counts the number of difference bewteen pair ray and arr greater than 0
function countLessDifference(ray, arr)
{
    let count = 0;

    for(i=0; i<ray.length; i++)
    {
        if (ray[i]-arr[i]<0)
            count++;
    }
    return count;
}

function pvalPairedDifference(ray, arr)
{
    let p1 = 0;
    let p2 = 0;
    let t1Greater = countGreaterDifference(ray, arr);
    let t2Greater = countLessDifference(ray, arr);

    p1 = cumbinomialDis(t1Greater, t1Greater+t2Greater, 0.5);
    p2 = cumbinomialDis(t2Greater, t1Greater+ t2Greater, 0.5);

    if(p1< p2)
        return p1;
    else
        return p2
}

function ttest2samEqualVar(arr, ray)
{
    let stand=0;

    let arrSD=calcSD(arr);
    let raySD=calcSD(ray);
    let arrMean=calcMean(arr);
    let rayMean=calcMean(ray);

    stand = Math.sqrt(((arr.length-1)*Math.pow(arrSD,2)+(ray.length-1)*Math.pow(raySD,2))/(arr.length*2-2));

    return ((arrMean-rayMean)/(stand*Math.sqrt(1/ray.length+1/arr.length)));
}

function pval2samEqualVar(arr,ray)
{
    return (1 - jStat.studentt.cdf(Math.abs(ttest2samEqualVar(arr,ray)), 10))*2;
}

function anovaTest(arr, ray, lis)
{
    let k =3;
    let totalN=18;
    let totalMean=calcMean([calcMean(arr),calcMean(ray),calcMean(lis)]);
    let arrMean = calcMean(arr);
    let rayMean = calcMean(ray);
    let lisMean = calcMean(lis);

    let ssb = 6*(Math.pow(arrMean-totalMean,2)+Math.pow(rayMean-totalMean,2)+Math.pow(lisMean-totalMean,2));

    let ssw =0;
    for(i=0;i<6;i++)
    {
        ssw = ssw + Math.pow(ray[i]-rayMean,2)+ Math.pow(arr[i]-arrMean,2)+Math.pow(lis[i]-lisMean,2);
    }

    let F = ((ssb/2)/(ssw/15));

    let p = 1 - jStat.centralF.cdf(F, k - 1, totalN - k);

    return [F,p];
}

function ttestA8(arr, ray)
{
    let cor = calcCorrelation(arr, ray, 20);
    return cor/(Math.sqrt((1-Math.pow(cor,2))/18));
}   

function pvalA8(arr, ray)
{
    return 1-jStat.studentt.cdf(Math.abs(ttestA8(arr,ray)), 18);
}

function chiSquaredTtest(miceData)
{
    let actual = [[miceData[0], 50-miceData[0]],[miceData[1], 50-miceData[1]]];
    let expected = [[(miceData[0]+miceData[1])/2, 50 - (miceData[0]+miceData[1])/2],[(miceData[0]+miceData[1])/2, 50 - (miceData[0]+miceData[1])/2]]

    let chiSquaredValue = [[0,0],[0,0]];
    chiSquaredValue[0][0]=Math.pow(actual[0][0]-expected[0][0],2)/expected[0][0];
    chiSquaredValue[0][1]=Math.pow(actual[0][1]-expected[0][1],2)/expected[0][1];
    chiSquaredValue[1][0]=Math.pow(actual[1][0]-expected[1][0],2)/expected[1][0];
    chiSquaredValue[1][1]=Math.pow(actual[1][1]-expected[1][1],2)/expected[1][1];

    return chiSquaredValue[0][0]+chiSquaredValue[1][0]+chiSquaredValue[0][1]+chiSquaredValue[1][1]


}

function chiSquaredPval(miceData)
{
   return 1 - jStat.chisquare.cdf(chiSquaredTtest(miceData), 1)
}

//function designed to read in values of assignment one, 
// compare to correct answers and return a boolean array
function assignment1()
{
    //intialize arrays
    let returnray = [];
    let correctRay = [false, false, false]; 
    //retrieve inputs
    const dataSet = parseInt(document.getElementById('dataset').value); 
    const seedValue = parseInt(document.getElementById('school').value) * parseInt(document.getElementById('year').value);
    const userMean = parseFloat(document.getElementById('mean').value); 
    const userSD = parseFloat(document.getElementById('sd').value); 
    const userCorr = parseFloat(document.getElementById('corr').value);

    //get the data with getDataSet
    getDataset((seedValue*dataSet), dataSet); 

    //calc the correct answers
    //calc mean with calcMean
    returnray[0] = Math.round((calcMean(scoreData))* decP)/ decP; 
    //calc SD with calcSD
    returnray[1] = Math.round((calcSD(scoreData))* decP)/ decP;
    //calc the correlation coef
    returnray[2] = Math.round(calcCorrelation(kwhXData, kwhYData, kwhXData.length)*decP)/decP;
    
    //if user mean is correct
    if(Math.abs(userMean - returnray[0])<0.5/decP)
        correctRay[0] = true; 
    //if user SD is correct
    if(Math.abs(userSD - returnray[1])<0.5/decP)
        correctRay[1] = true;
    //if user correlation coef is correct
    if(Math.abs(userCorr - returnray[2])<0.5/decP)
        correctRay[2] = true; 

    //return boolean of correct or not
    return correctRay; 
}

//return the correct answer for assignment 1 with dataset number and seedvalue
function assignment1answers(dataSet, seedvalue){
    let returnray = []; 

    //get the data for the dataset number and seedvalue
    getDataset((seedvalue), dataSet); 
    
    //calc the correct answers
    //calc mean with calcMean
    returnray[0] = Math.round(calcMean(scoreData)*decP)/decP; 
    //calc SD with calcSD
    returnray[1] = Math.round(calcSD(scoreData)*decP)/decP; 
    //calc the correlation coef
    returnray[2] = Math.round(calcCorrelation(kwhXData, kwhYData, kwhXData.length)*decP)/decP; 

    //return the correct array
    return returnray;
}
//function designed to read in values of assignment two, 
// compare to correct answers and return a boolean array
function assignment2()
{
    //intialize arrays
    let returnray = [] 
    let correctRay = [false, false, false, false, false, false] 
   
    //retrieve inputs
    const dataSet = parseInt(document.getElementById('dataset').value); 
    const seedValue = parseInt(document.getElementById('school').value) * parseInt(document.getElementById('year').value);
    const userIQ = parseFloat(document.getElementById('iQ').value); 
    const user9th = parseFloat(document.getElementById('ninth').value); 
    const userMedian = parseFloat(document.getElementById('median').value);
    const userregA = parseFloat(document.getElementById('regresA').value);
    const userregB = parseFloat(document.getElementById('regresB').value);
    const userPredict = parseFloat(document.getElementById('predict').value);

    //get the data for the specific dataset and seed values
    getDataset((seedValue*dataSet), dataSet);
    
    //calc the correct array
    //calc the IQR
    returnray[0] = calcPrecentile(scoreData,0.75) - calcPrecentile(scoreData,0.25);
    //calc the ninth decile
    returnray[1] = calcPrecentile(scoreData, 0.9);
    //calc median
    returnray[2] = calcPrecentile(scoreData, 0.5);
    //calc Regression equation and store slope and intercept
    returnray[3] = Math.round(calcRegression(kwhXData, kwhYData)[0]*decP)/decP;
    returnray[4] = Math.round(calcRegression(kwhXData, kwhYData)[1]*decP)/decP;
    returnray[5] = calcRegression(kwhXData, kwhYData)[0]*30+calcRegression(kwhXData,kwhYData)[1]
    returnray[5] = Math.round(returnray[5]*decP)/decP;

    
    //if user IQR is correct
    if(Math.abs(userIQ - returnray[0])<0.5/decP)
        correctRay[0] = true;
    //if user ninth decile is correct
    if(Math.abs(user9th - returnray[1])<0.5/decP)
        correctRay[1] = true;
    //if user median is correct
    if(Math.abs(userMedian - returnray[2])<0.5/decP)
        correctRay[2] = true;
    //if user regression slope is correct
    if(Math.abs(userregA -returnray[3])<0.5/decP)
        correctRay[3] = true;
    //if user regression intercept is correct
    if(Math.abs(userregB - returnray[4])<0.5/decP)
        correctRay[4] = true;
    if(Math.abs(userPredict - returnray[5])<0.5/decP)
        correctRay[5] = true;


    //return boolean of correct or not
    return correctRay; 
}

//function to return correct answers for 
// assignment 2 for a specific dataset and seedvalue
function assignment2answers(dataSet, seedvalue)
{
    //initalize array
    let returnray = []; 
    //retrieve the datasets for the specific seedvalue 
    getDataset((seedvalue), dataSet);
    
    //calc the correct array
    //calc the IQR
    returnray[0] = calcPrecentile(scoreData,0.75) - calcPrecentile(scoreData,0.25);
    //calc the ninth decile
    returnray[1] = calcPrecentile(scoreData, 0.9);
    //calc median
    returnray[2] = calcPrecentile(scoreData, 0.5);
    //calc Regression equation and store slope and intercept
    returnray[3] = Math.round(calcRegression(kwhXData, kwhYData)[0]*decP)/decP;
    returnray[4] = Math.round(calcRegression(kwhXData, kwhYData)[1]*decP)/decP;
    returnray[5] = calcRegression(kwhXData, kwhYData)[0]*30+calcRegression(kwhXData,kwhYData)[1];
    returnray[5] = Math.round(returnray[5]*decP)/decP;

    //return correct answers
    return returnray; 
}

//function designed to read in values of assignment one, 
// compare to correct answers and return a boolean array
function assignment3()
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false]; 

    //retrieve inputs
    const dataSet = parseInt(document.getElementById('dataset').value); 
    const seedValue = parseInt(document.getElementById('school').value) * parseInt(document.getElementById('year').value);
    const userMean = parseFloat(document.getElementById('mean').value); 
    const userConf = parseFloat(document.getElementById('conf').value); 
    const userincdec = parseFloat(document.getElementById('inc/dec').value);
    const userSlope = parseFloat(document.getElementById('slope').value);
    const userconfSlope = parseFloat(document.getElementById('confSlope').value);
    const userunits = parseFloat(document.getElementById('units').value);

    

    //get the datasets
    getDataset((seedValue*dataSet), dataSet);

    //calc the scoredata mean with calcMean
    returnray[0] = Math.round(calcMean(scoreData)*decP)/decP;
    //calc the confidence interval with confMean95
    returnray[1] = Math.round(confMean95(scoreData)*decP)/decP; 
    //store the correct increase of decrease of slope
    returnray[2] = 1;
    //calc the slope of the regression equation with 
    // calcRegression and store as positive number
    returnray[3] = Math.round(Math.abs(calcRegression(kwhXData, kwhYData)[0])*decP)/decP; 
    //calc the confidence interval of the slope with confReg95
    returnray[4] = Math.round(confReg95(kwhXData, kwhYData)*decP)/decP; 
    returnray[5] = 4
    
    //if user mean is correct
    if(Math.abs(userMean - returnray[0])<0.5/decP)
        correctRay[0] = true; 
    //if the user confidence interval is correct
    if(Math.abs(userConf - returnray[1])<0.5/decP)
        correctRay[1] = true; 
    //if the user increase/decrease relationship is correct
    if(Math.abs(userincdec - returnray[2])<0.5/decP)
        correctRay[2] = true; 
    //if the user slope is correct
    if(Math.abs(userSlope - returnray[3])<0.5/decP)
        correctRay[3] = true; 
    //if the user slope confidence interval is correct
    if(Math.abs(userconfSlope - returnray[4])<0.5/decP)
        correctRay[4] = true; 
    if(userunits == 4)
        correctRay[5] = true;

     //return boolean of correct or not
    return correctRay; 
}
//function to return correct answers for 
// assignment 3 for a specific dataset and seedvalue
function assignment3answers(dataSet, seedvalue)
{
    //intialize array
    let returnray = [];
   
    //get the data sets with getDataSet
    getDataset((seedvalue), dataSet);

    //calc the scoredata mean with calcMean
    returnray[0] = Math.round(calcMean(scoreData)*decP)/decP; 
    //calc the confidence interval with confMean95
    returnray[1] = Math.round(confMean95(scoreData)*decP)/decP; 
    //store the correct increase of decrease of slope
    returnray[2] = 1;
    //calc the slope of the regression equation with 
    // calcRegression and store as positive number
    returnray[3] = Math.round(Math.abs(calcRegression(kwhXData, kwhYData)[0])*decP)/decP; 
    //calc the confidence interval of the slope with confReg95
    returnray[4] = Math.round(confReg95(kwhXData, kwhYData)*decP)/decP; 
    returnray[5] =4;

    //return correct answers
    return returnray; 
}

function assignment4()
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 

    //retrieve inputs
    const dataSet = parseInt(document.getElementById('dataset').value); 
    const seedValue = parseInt(document.getElementById('school').value) * parseInt(document.getElementById('year').value);
    const userP1A = parseFloat(document.getElementById('Assumptionsp1').value); 
    const userP1H = parseFloat(document.getElementById('Hypothp1').value); 
    const userP1TestStat = parseFloat(document.getElementById('Teststatp1').value);
    const userP1Pval = parseFloat(document.getElementById('Pvalp1').value);
    const userP1RR1 = parseFloat(document.getElementById('RRp1').value);
    const userP1Comp = parseFloat(document.getElementById('comparep1').value);
    const userP1Con = parseFloat(document.getElementById('Conp1').value);
    const userP2A = parseFloat(document.getElementById('Assumptionsp2').value); 
    const userP2H = parseFloat(document.getElementById('Hypothp2').value); 
    const userP2TestStat1 = parseFloat(document.getElementById('Teststatp2.1').value);
    const userP2TestStat2 = parseFloat(document.getElementById('Teststatp2.2').value);
    const userP2Pval = parseFloat(document.getElementById('Pvalp2').value);
    const userP2RR1 = parseFloat(document.getElementById('RRp2').value);
    const userP2Comp = parseFloat(document.getElementById('comparep2').value);
    const userP2Con = parseFloat(document.getElementById('Conp2').value);

    //get the datasets
    getDataset((seedValue*dataSet), dataSet);

    //calc the scoredata mean with calcMean
    returnray[0] = 1;
    //calc the confidence interval with confMean95
    returnray[1] = 1; 
    
    returnray[2] = Math.round(oneSamHypothTstat(scoreData, 77)*decP)/decP;
    //calc the slope of the regression equation with 
    // calcRegression and store as positive number
    returnray[3] = Math.round(oneSamHypothPvalue(scoreData, 77)*decP)/decP; 
    //calc the confidence interval of the slope with confReg95
    returnray[4] = returnray[3]; 

    returnray[5] = 3;

    returnray[6] = 2;
    if(returnray[4]<0.01)
        returnray[6] = 1;

    returnray[7] = 1;

    returnray[8] = 7;

    returnray[9] = countLess(scoreData, 77);

    returnray[10] = countLess(scoreData, 77) + countMore(scoreData, 77);

    returnray[11] = Math.round(cumbinomialDis(countLess(scoreData, 77), countLess(scoreData,77)+countMore(scoreData,77), 0.5)*decP)/decP;

    returnray[12] = returnray[11]

    returnray[13] = 3;

    returnray[14] = 2;

    if(returnray[11]<0.01)
        returnray[14]=1;
   
    //console.log(returnray);
  
    if(userP1A == returnray[0])
        correctRay[0] = true; 
   
    if(userP1H == returnray[1])
        correctRay[1] = true; 
   
    if(Math.abs(userP1TestStat - returnray[2])<0.5/decP)
        correctRay[2] = true; 

    if(Math.abs(userP1Pval - returnray[3])<0.5/decP)
        correctRay[3] = true; 

    if(Math.abs(userP1RR1 - returnray[4])<0.5/decP)
        if(userP1Comp == returnray[5])
            correctRay[4] = true; 

    if(userP1Con == returnray[6])
        correctRay[5] = true; 

    if(userP2A == returnray[7])
        correctRay[6] = true; 
   
    if(userP2H == returnray[8])
        correctRay[7] = true; 
   
    if(userP2TestStat1 == returnray[9])
        if(userP2TestStat2 == returnray[10])
        correctRay[8] = true; 

    if(Math.abs(userP2Pval - returnray[11])<0.5/decP)
        correctRay[9] = true; 

    if(Math.abs(userP2RR1 - returnray[12])<0.5/decP)
        if(userP2Comp == returnray[13])
            correctRay[10] = true; 

    if(userP2Con == returnray[14])
        correctRay[11] = true; 

     //return boolean of correct or not
    return correctRay; 
}


function assignment4answers(dataSet, seedvalue)
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]; 

    //retrieve inputs

    //get the datasets
    getDataset((seedvalue), dataSet);

    //calc the scoredata mean with calcMean
    returnray[0] = 1;
    //calc the confidence interval with confMean95
    returnray[1] = 1; 
    //store the correct increase of decrease of slope
    returnray[2] = Math.round(oneSamHypothTstat(scoreData,77)*decP)/decP; 
    //calc the slope of the regression equation with 
    // calcRegression and store as positive number
    returnray[3] = Math.round(oneSamHypothPvalue(scoreData, 77)*decP)/decP; 
    //calc the confidence interval of the slope with confReg95
    returnray[4] = returnray[3]; 

    returnray[5] = 1;

    returnray[6] = 2;
    if(returnray[4]<0.01)
        returnray[6] = 1;

    returnray[7] = 1;

    returnray[8] = 7;

    returnray[9] = countLess(scoreData, 77)

    returnray[10] = countLess(scoreData, 77) + countMore(scoreData, 77)

    returnray[11] = Math.round(cumbinomialDis(countLess(scoreData, 77), countLess(scoreData,77)+countMore(scoreData,77), 0.5)*decP)/decP

    returnray[12] = returnray[11]

    returnray[13] = 1;

    returnray[14] = 2;

    if(returnray[11]<0.01)
        returnray[14]=1;

     //return boolean of correct or not
    return returnray; 
}

function assignment5()
{

     //intialize arrays
     let returnray = []; 
     let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 
 
     //retrieve inputs
     const dataSet = parseInt(document.getElementById('dataset').value); 
     const seedValue = parseInt(document.getElementById('school').value) * parseInt(document.getElementById('year').value);
     const userP1A = parseFloat(document.getElementById('Assumptionsp1').value); 
     const userP1H = parseFloat(document.getElementById('Hypothp1').value); 
     const userP1TestStat = parseFloat(document.getElementById('Teststatp1').value);
     const userP1Pval = parseFloat(document.getElementById('Pvalp1').value);
     const userP1RR1 = parseFloat(document.getElementById('RRp1').value);
     const userP1Comp = parseFloat(document.getElementById('comparep1').value);
     const userP1Con = parseFloat(document.getElementById('Conp1').value);
     const userP2A = parseFloat(document.getElementById('Assumptionsp2').value); 
     const userP2H = parseFloat(document.getElementById('Hypothp2').value); 
     const userP2TestStat1 = parseFloat(document.getElementById('Teststatp2.1').value);
     const userP2TestStat2 = parseFloat(document.getElementById('Teststatp2.2').value);
     const userP2Pval = parseFloat(document.getElementById('Pvalp2').value);
     const userP2RR1 = parseFloat(document.getElementById('RRp2').value);
     const userP2Comp = parseFloat(document.getElementById('comparep2').value);
     const userP2Con = parseFloat(document.getElementById('Conp2').value);
 
     //get the datasets
     getDataset((seedValue*dataSet), dataSet);
 
     //calc the scoredata mean with calcMean
     returnray[0] = 4;
     //calc the confidence interval with confMean95
     returnray[1] = 5; 
     //store the correct increase of decrease of slope
     returnray[2] = Math.round(TtestPairedMeans(t1Data, t2Data)*decP)/decP;
     //calc the slope of the regression equation with 
     // calcRegression and store as positive number
     returnray[3] = Math.round(pvalPairedMeans(t1Data,t2Data)*decP)/decP; 
     //calc the confidence interval of the slope with confReg95
     returnray[4] = returnray[3]; 
 
     returnray[5] = 2;
 
     returnray[6] = 2;
     if(returnray[4]<0.05)
         returnray[6] = 1;
 
     returnray[7] = 1;
 
     returnray[8] = 11;
 
     returnray[9] = countLessDifference(t1Data, t2Data);
 
     returnray[10] = countLessDifference(t1Data, t2Data) + countGreaterDifference(t1Data,t2Data);
 
     returnray[11] = Math.round(pvalPairedDifference(t1Data, t2Data)*decP)/decP;
 
     returnray[12] = returnray[11]
 
     returnray[13] = 2;
 
     returnray[14] = 2;
 
     if(returnray[11]<0.01)
         returnray[14]=1;
    
     //console.log(returnray);
   
     if(userP1A == returnray[0])
         correctRay[0] = true; 
    
     if(userP1H == returnray[1])
         correctRay[1] = true; 
    
     if(Math.abs(userP1TestStat - returnray[2])<0.5/decP)
         correctRay[2] = true; 
 
     if(Math.abs(userP1Pval - returnray[3])<0.5/decP)
         correctRay[3] = true; 
 
     if(Math.abs(userP1RR1 - returnray[4])<0.5/decP)
         if(userP1Comp == returnray[5])
             correctRay[4] = true; 
 
     if(userP1Con == returnray[6])
         correctRay[5] = true; 
 
     if(userP2A == returnray[7])
         correctRay[6] = true; 
    
     if(userP2H == returnray[8])
         correctRay[7] = true; 
    
     if(userP2TestStat1 == returnray[9])
         correctRay[8] = true; 
 
     if(userP2TestStat2 == returnray[10])
         correctRay[9] = true; 
 
     if(Math.abs(userP2Pval - returnray[11])<0.5/decP)
         correctRay[10] = true; 
 
     if(Math.abs(userP2RR1 - returnray[12])<0.5/decP)
         if(userP2Comp == returnray[13])
             correctRay[11] = true; 
 
     if(userP2Con == returnray[14])
         correctRay[12] = true; 
 
      //return boolean of correct or not
     return correctRay;

}

function assignment5answers(dataSet, seedvalue)
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 

    //retrieve inputs
   
    getDataset((seedvalue), dataSet);

    //calc the scoredata mean with calcMean
    returnray[0] = 4;
    //calc the confidence interval with confMean95
    returnray[1] = 5; 
    //store the correct increase of decrease of slope
    returnray[2] = Math.round(TtestPairedMeans(t1Data, t2Data)*decP)/decP;
    //calc the slope of the regression equation with 
    // calcRegression and store as positive number
    returnray[3] = Math.round(pvalPairedMeans(t1Data,t2Data)*decP)/decP; 
    //calc the confidence interval of the slope with confReg95
    returnray[4] = returnray[3]; 

    returnray[5] = 2;

    returnray[6] = 2;
    if(returnray[4]<0.05)
        returnray[6] = 1;

    returnray[7] = 1;

    returnray[8] = 11;

    returnray[9] = countLessDifference(t1Data, t2Data);

    returnray[10] = countLessDifference(t1Data, t2Data) + countGreaterDifference(t1Data,t2Data);

    returnray[11] = Math.round(pvalPairedDifference(t1Data, t2Data)*decP)/decP;

    returnray[12] = returnray[11]

    returnray[13] = 2;

    returnray[14] = 2;

    if(returnray[11]<0.01)
        returnray[14]=1;
   
    return returnray;
}

function assignment6()
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 

    //retrieve inputs
    const dataSet = parseInt(document.getElementById('dataset').value); 
    const seedValue = parseInt(document.getElementById('school').value) * parseInt(document.getElementById('year').value);
    const userTS1v2 = parseFloat(document.getElementById('Teststat1v2').value); 
    const userPV1v2 = parseFloat(document.getElementById('Pval1v2').value); 
    const userTS1v3 = parseFloat(document.getElementById('Teststat1v3').value);
    const userPV1v3 = parseFloat(document.getElementById('Pval1v3').value);
    const userTS2v3 = parseFloat(document.getElementById('Teststat2v3').value);
    const userPV2v3 = parseFloat(document.getElementById('Pval2v3').value);
    //const userP1Con = parseFloat(document.getElementById('Conp1').value);
    const userP2A = parseFloat(document.getElementById('Assumptionsp2').value); 
    const userP2H = parseFloat(document.getElementById('Hypothp2').value); 
    const userP2TestStat1 = parseFloat(document.getElementById('Teststatp2.1').value);
    //const userP2TestStat2 = parseFloat(document.getElementById('Teststatp2.2').value);
    const userP2Pval = parseFloat(document.getElementById('Pvalp2').value);
    const userP2RR1 = parseFloat(document.getElementById('RRp2').value);
    const userP2Comp = parseFloat(document.getElementById('comparep2').value);
    const userP2Con = parseFloat(document.getElementById('Conp2').value);

    //get the datasets
    getDataset((seedValue*dataSet), dataSet);

    returnray[0] = Math.round(ttest2samEqualVar(prod1Data, prod2Data)*decP)/decP;
    
    returnray[1] = Math.round(pval2samEqualVar(prod1Data,prod2Data)*decP)/decP; 
    
    returnray[2] = Math.round(ttest2samEqualVar(prod1Data, prod3Data)*decP)/decP;

    
    returnray[3] = Math.round(pval2samEqualVar(prod1Data,prod3Data)*decP)/decP; 
    
    returnray[4] = Math.round(ttest2samEqualVar(prod2Data, prod3Data)*decP)/decP; 

    returnray[5] = Math.round(pval2samEqualVar(prod2Data,prod3Data)*decP)/decP;

    //part 2
    returnray[6] = 6;

    returnray[7] = 15;

    returnray[8] = Math.round(anovaTest(prod1Data, prod2Data, prod3Data)[0]*decP)/decP;

    returnray[9] = Math.round(anovaTest(prod1Data, prod2Data, prod3Data)[1]*decP)/decP;

    returnray[10] = Math.round(anovaTest(prod1Data, prod2Data, prod3Data)[1]*decP)/decP;

    returnray[11]=2;

    returnray[12]=2;

    if(returnray[10]<0.05)
        returnray[12]=1;

    //stop
   
    //console.log(returnray);
  
    if(Math.abs(userTS1v2 - returnray[0])<0.5/decP)
        if(Math.abs(userPV1v2 - returnray [1])<0.5/decP)
            correctRay[0] = true; 
   
    if(Math.abs(userTS1v3 - returnray[2])<0.5/decP)
        if(Math.abs(userPV1v3 - returnray [3])<0.5/decP)
            correctRay[1] = true; 
   
    if(Math.abs(userTS2v3 - returnray[4])<0.5/decP)
        if(Math.abs(userPV2v3 - returnray [5])<0.5/decP)
            correctRay[2] = true; 


    //part 2
    if(userP2A == returnray[6])
        correctRay[3] = true; 

    if(userP2H == returnray[7])
            correctRay[4] = true; 

    if(Math.abs(userP2TestStat1 - returnray[8])<0.5/decP)
        correctRay[5] = true; 

    if(Math.abs(userP2Pval - returnray[9])<0.5/decP)
        correctRay[6] = true; 
   
    if(Math.abs(userP2RR1 - returnray[10])<0.5/decP)
        if(userP2Comp == returnray[11])
            correctRay[7] = true; 
   
    if(userP2Con == returnray[12])
        correctRay[8] = true; 

     //return boolean of correct or not
    return correctRay;
}

function assignment6answers(dataSet, seedvalue)
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 

    //get the datasets
    getDataset((seedvalue), dataSet);

    returnray[0] = Math.round(ttest2samEqualVar(prod1Data, prod2Data)*decP)/decP;
    
    returnray[1] = Math.round(pval2samEqualVar(prod1Data,prod2Data)*decP)/decP; 
    
    returnray[2] = Math.round(ttest2samEqualVar(prod1Data, prod3Data)*decP)/decP;

    
    returnray[3] = Math.round(pval2samEqualVar(prod1Data,prod3Data)*decP)/decP; 
    
    returnray[4] = Math.round(ttest2samEqualVar(prod2Data, prod3Data)*decP)/decP; 

    returnray[5] = Math.round(pval2samEqualVar(prod2Data,prod3Data)*decP)/decP;

    //part 2
    returnray[6] = 6;

    returnray[7] = 15;

    returnray[8] = Math.round(anovaTest(prod1Data, prod2Data, prod3Data)[0]*decP)/decP;

    returnray[9] = Math.round(anovaTest(prod1Data, prod2Data, prod3Data)[1]*decP)/decP;

    returnray[10] = Math.round(anovaTest(prod1Data, prod2Data, prod3Data)[1]*decP)/decP;

    returnray[11]=2;

    returnray[12]=2;

    if(returnray[10]<0.05)
        returnray[12]=1;

    //stop
   
    //console.log(returnray);
  

     //return boolean of correct or not
    return returnray;
}


function assignment7()
{

     //intialize arrays
     let returnray = []; 
     let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 
 
     //retrieve inputs
     const dataSet = parseInt(document.getElementById('dataset').value); 
     const seedValue = parseInt(document.getElementById('school').value) * parseInt(document.getElementById('year').value);
     const userP1A = parseFloat(document.getElementById('Assumptionsp1').value); 
     const userP1H = parseFloat(document.getElementById('Hypothp1').value); 
     const userP1TestStat = parseFloat(document.getElementById('Teststatp1').value);
     const userP1Pval = parseFloat(document.getElementById('Pvalp1').value);
     const userP1RR1 = parseFloat(document.getElementById('RRp1').value);
     const userP1Comp = parseFloat(document.getElementById('comparep1').value);
     const userP1Con = parseFloat(document.getElementById('Conp1').value);
     const userP2A = parseFloat(document.getElementById('Assumptionsp2').value); 
     const userP2H = parseFloat(document.getElementById('Hypothp2').value); 
     const userP2TestStat1 = parseFloat(document.getElementById('Teststatp2.1').value);
     //const userP2TestStat2 = parseFloat(document.getElementById('Teststatp2.2').value);
     const userP2Pval = parseFloat(document.getElementById('Pvalp2').value);
     const userP2RR1 = parseFloat(document.getElementById('RRp2').value);
     const userP2Comp = parseFloat(document.getElementById('comparep2').value);
     const userP2Con = parseFloat(document.getElementById('Conp2').value);
 
     //get the datasets
     getDataset((seedValue*dataSet), dataSet);
 
     //calc the scoredata mean with calcMean
     returnray[0] = 3;
     //calc the confidence interval with confMean95
     returnray[1] = 14; 
     //store the correct increase of decrease of slope
     returnray[2] = Math.round(ttestA8(kwhXData,kwhYData)*decP)/decP
     //calc the slope of the regression equation with 
     // calcRegression and store as positive number
     returnray[3] = Math.round(pvalA8(kwhXData, kwhYData)*decP)/decP
     //calc the confidence interval of the slope with confReg95
     returnray[4] = returnray[3]; 
 
     returnray[5] = 3;
 
     returnray[6] = 2;
     if(returnray[4]<0.01)
         returnray[6] = 1;
 
     //part2
     returnray[7] = 1;
 
     returnray[8] = 16;
 
     returnray[9] = Math.round(chiSquaredTtest(miceData)*decP)/decP;
 
     returnray[10] = Math.round(chiSquaredPval(miceData)*decP)/decP
 
     returnray[11] = returnray[10]
 
     returnray[12] = 2
 
     returnray[13] = 2;
 
     if(returnray[11]<0.05)
         returnray[13]=1;
    
     //console.log(returnray);
   
     if(userP1A == returnray[0])
         correctRay[0] = true; 
    
     if(userP1H == returnray[1])
         correctRay[1] = true; 
    
     if(Math.abs(userP1TestStat - returnray[2])<0.5/decP)
         correctRay[2] = true; 
 
     if(Math.abs(userP1Pval - returnray[3])<0.5/decP)
         correctRay[3] = true; 
 
     if(Math.abs(userP1RR1 - returnray[4])<0.5/decP)
         if(userP1Comp == returnray[5])
             correctRay[4] = true; 
 
     if(userP1Con == returnray[6])
         correctRay[5] = true; 
 
     if(userP2A == returnray[7])
         correctRay[6] = true; 
    
     if(userP2H == returnray[8])
         correctRay[7] = true; 
    
     if(Math.abs(userP2TestStat1 - returnray[9])<0.5/decP)
         correctRay[8] = true; 
 
     if(Math.abs(userP2Pval - returnray[10])<0.5/decP)
         correctRay[9] = true; 
 
     if(Math.abs(userP2RR1 - returnray[11])<0.5/decP)
         if(userP2Comp == returnray[12])
             correctRay[10] = true; 
 
     if(userP2Con == returnray[13])
         correctRay[11] = true; 
 
      //return boolean of correct or not
     return correctRay;

}

function assignment7answers(dataSet, seedvalue)
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 

    //get the datasets
    getDataset((seedvalue), dataSet);

    //calc the scoredata mean with calcMean
    returnray[0] = 3;
    //calc the confidence interval with confMean95
    returnray[1] = 14; 
    //store the correct increase of decrease of slope
    returnray[2] = Math.round(ttestA8(kwhXData,kwhYData)*decP)/decP;
    //calc the slope of the regression equation with 
    // calcRegression and store as positive number
    returnray[3] = Math.round(pvalA8(kwhXData, kwhYData)*decP)/decP;
    //calc the confidence interval of the slope with confReg95
    returnray[4] = returnray[3]; 

    returnray[5] = 3;

    returnray[6] = 2;
    if(returnray[4]<0.01)
        returnray[6] = 1;

    //part2
    returnray[7] = 1;

    returnray[8] = 16;

    returnray[9] = Math.round(chiSquaredTtest(miceData)*decP)/decP;

    returnray[10] = Math.round(chiSquaredPval(miceData)*decP)/decP;

    returnray[11] = returnray[10];

    returnray[12] = 2;

    returnray[13] = 2;

    if(returnray[11]<0.05)
        returnray[13]=1;

    return returnray;
}

function assignment8()
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 

    //retrieve inputs
    const dataSet = parseInt(document.getElementById('dataset').value); 
    const seedValue = parseInt(document.getElementById('school').value) * parseInt(document.getElementById('year').value);
    const userQ1 = parseFloat(document.getElementById('Question1').value);
    const userQ2 = parseFloat(document.getElementById('Question2').value);
    const userQ3 = parseFloat(document.getElementById('Question3').value);
    const userQ4 = parseFloat(document.getElementById('Question4').value);
    const userQ5 = parseFloat(document.getElementById('Question5').value);
    const userQ6 = parseFloat(document.getElementById('Question6').value);
    const userQ7 = parseFloat(document.getElementById('Question7').value);
    const userQ8 = parseFloat(document.getElementById('Question8').value);
    const userQ9 = parseFloat(document.getElementById('Question9').value);
    const userQ10 = parseFloat(document.getElementById('Question10').value);
    

    //get the datasets
    getDataset((seedValue*dataSet), dataSet);

    //question1
    returnray[0] = 4;
    //question2
    returnray[1] = 8;
    //question3
    returnray[2] = 10;
    //question4
    returnray[3] = 7;
    //question5
    returnray[4] = 6;
    //question6
    returnray[5] = 3;
    //question7
    returnray[6] = 1;
    //question8
    returnray[7] = 10;
    //question9
    returnray[8] = 3;
    //question10
    returnray[9] = 5;
    //console.log(returnray);

    if(userQ1 == returnray[0])
        correctRay[0] = true;

    if(userQ2 == returnray[1])
        correctRay[1] = true;

    if(userQ3== returnray[2])
        correctRay[2] = true;

    if(userQ4 == returnray[3])
        correctRay[3] = true;

    if(userQ5 == returnray[4])
        correctRay[4] = true;

    if(userQ6 == returnray[5])
        correctRay[5] = true;

    if(userQ7 == returnray[6])
        correctRay[6] = true;

    if(userQ8 == returnray[7])
        correctRay[7] = true;

    if(userQ9 == returnray[8])
        correctRay[8] = true;

    if(userQ10 == returnray[9])
        correctRay[9] = true;
     //return boolean of correct or not
    return correctRay;
}

function assignment8answers()
{
    //intialize arrays
    let returnray = []; 
    let correctRay = [false, false, false, false, false, false, false, false, false, false, false, false, false]; 
    
    //get the datasets
    getDataset((seedValue*dataSet), dataSet);

    //question1
    returnray[0] = 4;
    //question2
    returnray[1] = 8;
    //question3
    returnray[2] = 10;
    //question4
    returnray[3] = 7;
    //question5
    returnray[4] = 6;
    //question6
    returnray[5] = 3;
    //question7
    returnray[6] = 1;
    //question8
    returnray[7] = 10;
    //question9
    returnray[8] = 3;
    //question10
    returnray[9] = 5;
    //console.log(returnray);

   return returnray;
}