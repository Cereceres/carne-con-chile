# outliers-lizia
Simple librery to remove outliers from data

## Installation

```bash
npm install outliers-lizia
```

## Usage 

```js
const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 1, 1.6, 1)
/**
[1, 2, 1, 2, 3, 3, 2, 1, 2, 3]
*/
assert(res.length === 10);
```

## API

## outliers-lizia -> {outliersRemoving, getStats}


## outliersRemoving(arrayOfData = [] [, dim = 1, numSigma = 1.645, dg = 0, timeSeries])

arrayOfData = [x_{1}, x_{2}, x_{3}, ...,x_{NxD}] - Data to be analysed and remove the outliers,
where N is the number of observvations and D the dimension of every observation.

dim = Number - Default value is 1, and is the number of dimensions of observations.

numSigma = Number - Default value is 1.645 and is the number of sigma to be used in the filter of outliers removing.

dg = Number - Default value is zero and is the parameter used to calculate the SD. Example:
SD^2= Sum((x_i- E{x})^2/(N-dg))

timeSeries = Number || Array || Function -  this is the value what will be used like average of data, can be a number if dimensions is 1, a array constant
if dim is greater than 1, can be a function if is a time serie.

*If is a function: timeSeries(datum, index, numberDatum) -> Number

datum = [x_1,...,x_D]

index = Number - is the index of datum, index is a number in range [0,D-1]. This function is evaluated D times.

numberDatum = Number - is the index of datum in data sets given, numberDatum is a number in range [0,N-1].

## getStats(data, [dim = 1, dg = 0, timeSeries])

data = [x_{1}, x_{2}, x_{3}, ...,x_{NxD}] - Data to be analysed and remove the outliers,
where N is the number of observvations and D the dimension of every observation.

dim = Number - Default value is 1, and is the number of dimensions of observations.

numSigma = Number - Default value is 1.645 and is the number of sigma to be used in the filter of outliers removing.

dg = Number - Default value is zero and is the parameter used to calculate the SD. Example:   SD^2= Sum((x_i- E{x})^2/(N-dg))

timeSeries = Number || Array || Function -  this is the value what will be used like average of data, can be a number if dimensions is 1, a array constant
if dim is greater than 1, can be a function if is a time serie.

*If is a function: timeSeries(datum, index, numberDatum) -> Number

datum = [x_1,...,x_D]

index = Number - is the index of datum, index is a number in range [0,D-1]. This function is evaluated D times.

numberDatum = Number - is the index of datum in data sets given, numberDatum is a number in range [0,N-1].


## How does it remove to higth dimension data (Elipse)

Example of two dimensions:

    datum = [x_1, x_2]

    is removed if:

    (x_1- E_1)^2/sigma_1^2 + (x_2- E_2)^2/sigma_2^2 > numSigma 

    This because independence of observations is considered:


    P(A & B) = P(A) P(B) ≈ e^[-(x_1- E_1)^2/sigma_1^2]*e^[-(x_2- E_2)^2/sigma_2^2] 
    
    = e^[-(x_1- E_1)^2/sigma_1^2-(x_1- E_1)^2/sigma_1^2)]

    the value default is obvius bacause factor sqrt(2) in normal distrubution and generalization to higther dimension too.
 
    ** & = intersection
    U = union
