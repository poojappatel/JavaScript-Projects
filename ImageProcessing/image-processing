let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');
//robot.show();

// removeRed: removes red color intensity from each pixel in the image
// parameter: an image as an argument
// result: returns a new alterd image
function removeRed(img) {
  // Creating copy of image
  let imgCopy = img.copy();
  // Iterating through the width and height of the image to access each pixel
  for (let i = 0; i < imgCopy.width; ++i) {
    for (let j = 0; j < imgCopy.height; ++j) {
      // Getting the color intensities of each pixel
      // Setting the color intensity of each pixel
      let noRed = imgCopy.getPixel(i,j);
      imgCopy.setPixel(i, j, [0, noRed[1], noRed[2]]);
    }
  }
  return imgCopy;
}

// flipColors: flip the color intensities of each pixel by 
// taking the average of the other two color intensities
// parameter: an image as an argument
// result: returns a new alterd image
function flipColors(img) {
  // Creating copy of image, so original image is not altered
  let imgCopy = img.copy();
  // Iterating through the width and height of the image to access each pixel
  for (let i = 0; i < imgCopy.width; ++i) {
    for (let j = 0; j < imgCopy.height; ++j) {
      // Getting the color intensities of each pixel
      // Setting the color intensity of each pixel
      let flip = imgCopy.getPixel(i,j);
      imgCopy.setPixel(i, j, [(flip[1] + flip[2])/2 , (flip[0] + flip[2])/2, (flip[0] + flip[1])/2]);
    }
  }
  return imgCopy;
}

// mapline: modifies all pixels horizontally along the image at the given line number
// parameters: an image as an argument, a number that is the height of image and a 
// function that modifies the pixels along the line
// result: void function, modifies the image passed directly
function mapLine(img, lineNo, func) {
  // Checking if the line number argument is invalid
  if ((lineNo === undefined) || (lineNo === null) || (lineNo < 0) || (lineNo >= img.height) || (lineNo % 1 !== 0)) {
    console.log("Invalid line number. Image not modified.");
  } else {
    // Iterating through only the width of the image to access pixels on a given horizontal line
    for (let i = 0; i < img.width; ++i) {
      // Getting and setting color intensities of pixels horizontally along the lineNo arguemnt
      img.setPixel(i, lineNo, func(img.getPixel(i, lineNo)));
    }
  }
}

// imageMap: modifies the pixels of an image
// parameters: an image as an argument and a function that modifies the pixels
// result: returns a new alterd image
function imageMap(img, func) {
  // Creating copy of image
  let imgCopy = img.copy();
  // Iterating through the height of the image
  for (let j = 0; j < imgCopy.height; ++j) {
    // Calling mapLine, setting j as the argument for lineNo to iterate 
    // through whole image
    mapLine(imgCopy, j, func);
  }
  return imgCopy;
}

// mapToGB function: removes red from the pixels in an image byt calling imageMap
// parameters: an image as an argument
// result: returns new altered image
function mapToGB(img) {
  // Calling imageMap, passing the image passed in mapToGB and 
  // passing function that modifies the pixels
  return imageMap(img, p => [0.0, p[1], p[2]]);
}

// mapFlipColors: flips the color intensities at each pixel of the image by taking
// the average of the other two color intensities
// parameters: an image as an argument
// result: returns new altered image
function mapFlipColors(img) {
  // Calling imageMap, passing the image passed in mapFlipColors and 
  // passing function that modifies the pixels
  return imageMap(img, p => [(p[1] + p[2])/2 , (p[0] + p[2])/2, (p[0] + p[1])/2]);
}

// imageMapCoord: modifies the pixels of an image but is a more generalized function
// where the new pixel values may depend on the original pixel coordinates
// parameters: an image as an argument and a function that can modify the pixels
// result: returns a new image
function imageMapCoord(img, func) {
  // Creating copy of image
  let imgCopy = img.copy();
  // Iterating through width and height of image
  for (let i = 0; i < img.width; ++i) {
    for (let j = 0; j < img.height; ++j) {
      // Setting pixels after using function that may have modified the pixels
      imgCopy.setPixel(i, j, func(img, i, j));
    }
  }
  return imgCopy;
}

// imageMapIf: modifies the pixels of an image if a condition passed returns true
// otherwise the pixel that doesn't satisfy the condition is not changed
// parameters: an image as an argument, a condition that is passed as a function
// and a function that modifies the pixels
// result: returns a new image
function imageMapIf(img, cond, func) {
  // Creating copy of image
  let imgCopy = img.copy();
  // Calling imageMapCoord to access each pixel and check if it satisfies condition
  // If condition is true then modify pixel, otherwise do not modify
  return imageMapCoord(imgCopy, (imgCopy, x, y) => cond(imgCopy, x, y) ? func(imgCopy.getPixel(x,y)) : imgCopy.getPixel(x, y));
}

// mapWindow: modifies the pixels of an image if pixels are within specified interval
// and pixels are not modified if outside the intervals
// parameters: an image as an argument, min width, max width, min height, max height which are all numbers
// and a function that modifies the pixels
// result: returns a new image
function mapWindow(img, xmin, ymin, xmax, ymax, func) {
  // Calling imageMapIf to pass the conditions that see if pixels are
  // within the specified interval
  return imageMapIf(img, (img, x, y) => ((x >= xmin) && (x <= xmax) && (y >= ymin) && (y <= ymax)), func);
}

// makeBorder: modifies the pixels of an image that are the distance of thickness
// to edges, creating a border around the image
// parameters: an image as an argument, a number passed for thickness, and a function
// that modifies pixels
// result: returns a new image
function makeBorder(img, thickness, func) {
  // Checking if thickness is an invalid input, if thickness is the image
  // is not modified
  if ((thickness === undefined) || (thickness === null)) {
    return img.copy();
  } else {
    // If thickness is a valid input, then call imageMapIf over conditions that 
    // checks if pixels are not greater than distance of thickness, creating a border
    return imageMapIf(img, (img, x, y) => (!((thickness <= x) && (x <= img.width - thickness - 1) && (thickness <= y) && (y <= img.height - thickness - 1))), func);
  }
}

// dimCenter: modifies the pixels of an image that are not included in the border
// parameters: an image as an argument and thickness (distance from edges of image)
// result: returns a new image
function dimCenter(img, thickness) {
  // Checking if thickness is an invalid input, if thickness is the image
  // is not modified
  if ((thickness === undefined) || (thickness === null)) {
    return img.copy();
  } else {
    // If thickness is a valid input, calls imageMapIf over the condition that
    // checks if the pixels are greater than the distance of thickness
    return imageMapIf(img, (img, x, y) => ((thickness <= x) && (x <= img.width - thickness - 1) && (thickness <= y) && (y <= img.height - thickness - 1)), p => [(p[0]*0.8), (p[1]*0.8), (p[2]*0.8)]);
  }
}

// redBorder modifies the pixels of an image that are not included in the border
// parameters: an image as an argument and thickness (distance from edges of image)
// result: returns a new image
function redBorder(img, thickness) {
  // Calls makeBorder to create border, and passing a function that
  // modifies the pixels to create red border
  return makeBorder(img, thickness, p => [1,0,0]);
}

// grayBorder modifies the pixels of an image that are not included in the border
// parameters: an image as an argument and thickness (distance from edges of image)
// result: returns a new image
function grayBorder(img, thickness) {
  // Calls makeBorder to create border, and passing a function that
  // modifies the pixels to create gray border
  return makeBorder(img, thickness, p => [(p[0]+p[1]+p[2])/3,(p[0]+p[1]+p[2])/3,(p[0]+p[1]+p[2])/3]);
}


//lineBlur3p(img: Image, lineNo: number): void
// lineBlur3p: Changes each pixel in the line based on as a weighted sum of the original 
// color value in the pixel and in its neighbor (one pixel away) on that line 
// parameters: an image as an argument and a line number as a number
// result: void 
function lineBlur3p(img, lineNo) {
  let imgCopy = img.copy();
  // Checks for invalid input
  if ((lineNo === undefined) || (lineNo === null) || (lineNo < 0) || (lineNo >= img.height) || (lineNo % 1 !== 0)) {
    console.log("Invalid line number. Image not modified.");
  } else if (img.width !== 1) {
    //Iterates through the line
    for (let i = 0; i < imgCopy.width; ++i) {
      //Gets the pixel and its neighbor from an unchanged image
      let blur = imgCopy.getPixel(i, lineNo);
      let left = (i === 0) ? [0, 0, 0] : imgCopy.getPixel(i - 1, lineNo);
      let right = (i === (imgCopy.width - 1)) ? [0, 0, 0] : imgCopy.getPixel(i + 1, lineNo);
      // Sets weight based on position in the line
      let weight = (i === 0 || i === (imgCopy.width - 1)) ? 2/3 : 1/3;
      // Sets the pixel to the new weighted sum
      img.setPixel(i, lineNo, [(weight)*blur[0] + (1/3)*left[0] + (1/3)*right[0], (weight)*blur[1] + (1/3)*left[1] + (1/3)*right[1], (weight)*blur[2] + (1/3)*left[2] + (1/3)*right[2]]);
    }
  }
}

// lineBlur5p(img: Image, lineNo: number): void
// lineBlur5p: Changes each pixel in the line based on as a weighted sum of the 
// original color value in the pixel and in its neighbor (two pixel away) on that line
// parameters: an image as an argument and a line number as a number
// result: void 
function lineBlur5p(img, lineNo) {
  let imgCopy = img.copy();
  // Checks for invalid inputs
  if ((lineNo === undefined) || (lineNo === null) || (lineNo < 0) || (lineNo >= img.height) || (lineNo % 1 !== 0)) {
    console.log("Invalid line number. Image not modified.");
  } else if (img.width !== 1) {
    // Iterates through the line
    for (let i = 0; i < imgCopy.width; ++i) {
      // Gets the pixel and the two neighbors on each side from an unchanged image
      let blur = imgCopy.getPixel(i, lineNo);
      let left = (i === 0) ? [0, 0, 0] : imgCopy.getPixel(i - 1, lineNo);
      let leftMost = (i === 0 || i === 1) ? [0, 0, 0] : imgCopy.getPixel(i - 2, lineNo);
      let rightMost = (i === (imgCopy.width - 1) || i === (imgCopy.width - 2)) ? [0, 0, 0] : imgCopy.getPixel(i + 2, lineNo);
      let right = (i === (imgCopy.width - 1)) ? [0, 0, 0] : imgCopy.getPixel(i + 1, lineNo);     
      // Sets the current pixel's weight based on its position in the line and the width of the image
      let weight = 1/5;
      if ((i === 0 || i === (imgCopy.width - 1)) && (i === 1 || i === (imgCopy.width - 2))) {
        weight = 4/5
      } else if (i === 0 || i === (imgCopy.width - 1) || (img.width === 3)) {
        weight = 3/5;
      } else if (i === 1 || i === (imgCopy.width - 2)) {
        weight = 2/5;
      }
      // Sets the new pixel to the weighted sum 
      img.setPixel(i, lineNo, [(weight)*blur[0] + (1/5)*left[0] + (1/5)*leftMost[0] + (1/5)*right[0] + (1/5)*rightMost[0], 
      (weight)*blur[1] + (1/5)*left[1] + (1/5)*leftMost[1] + (1/5)*right[1] + (1/5)*rightMost[1], 
      (weight)*blur[2] + (1/5)*left[2] + (1/5)*leftMost[2] + (1/5)*right[2] + (1/5)*rightMost[2]]);
    }
  }
}

// blurLines(img: Image, blurLine: (img: Image, lineNo: number) => void): Image
// blurLines: Blurs an entire image using a blurLine function
// parameters: an image as an argument and a line number as a number
// result: blurred copy of the image parameter
function blurLines(img, blurLine) {
  let imgCopy = img.copy();
  // Iterates through the lines of the image 
  for (let i = 0; i < imgCopy.height; ++i) {
    // Blurs each line in the copy image 
    blurLine(imgCopy, i);
  }
  return imgCopy;
}

// pixelBlur(img: Image, x: number, y: number): Pixel
// Blurs the pixel at coordinates (x, y) by taking the mean of its RGB values 
// and of those of the pixels surrounding it 
// parameters: image as an argument, x coordinate as a number,  y coordinate as a number 
// result: the blurred value of pixel at (x, y)
function pixelBlur(img, x, y) {
  let imgCopy = img.copy();
  // Checks for invalid inputs
  if (((x === undefined) || (y === undefined)) || (x === null) || (y === null) || x < 0 || x >= imgCopy.width || y < 0 || y >= imgCopy.height || (x % 1 !== 0) || (y % 1 !== 0)) {
    console.log("Invalid pixel. Pixel not modified.");
    return;
  } else {
    let average = 0; let p1 = 0; let p2 = 0; let p3 = 0;
    // Iterates the 3x3 block of surrounding the pixels that are valid 
    for (let i = x - 1; i < x + 2; ++i) {
      if ( i >= 0 && i < img.width ) {
      for (let j = y - 1; j < y + 2; ++j) {
        // Checks if the pixel if the pixel is valid
        if (j >= 0 && j < img.height) {
        // Adds the pixels RGB values to the average 
        p1 += imgCopy.getPixel(i, j)[0];
        p2 += imgCopy.getPixel(i, j)[1];
        p3 += imgCopy.getPixel(i, j)[2];
        // Increases the counter for the number of pixels
        average += 1;
        }
      }
      }
    }
    // Returns the mean of all the valid pixels RGB values
    return [p1/average, p2/average, p3/average];
  }
}

// imageBlur(img: Image): Image
// imageBlur: blurs an image using pixelBlur
// prameters: image as an argument 
// result: returns a new blurred image
function imageBlur(img) {
  // Calls imageMapCoord to apply pixelBlur to each pixel in img
  let newImage = imageMapCoord(img, pixelBlur);
  return newImage;
}

// composeFunctions(fa: ((p: Pixel) => Pixel)[] ): ((x: Pixel) => Pixel)
// composeFunctions: compounds an array of functions into one function that takes in a pixel 
// and outputs a pixel
// parameters: an array of functions to compound 
// result: function that takes in a pixel and outputs a pixel that been through every function in the array
function composeFunctions(fa) { 
  //Takes in intial pixel and reduces fa into a single pixel using the intial pixel as the intial value
  return initial => fa.reduce((x, p) => p(x), initial);
}

// combineThree(img: Image): Image
// combineThree: combines removeRed, flipColors twice using compose functions applies it to an image
// parameters: image as an argument 
// result: a new image that has removeRed and flipColors twice applied to it 
function combineThree(img) {
  // Uses imageMap to iterate to every pixel in the image and applies the composed function
  return imageMap(img, composeFunctions([p => [0, p[1], p[2]], p => [(p[1]+p[2])/2, (p[0]+p[2])/2, (p[0]+p[1])/2], p => [(p[1]+p[2])/2, (p[0]+p[2])/2, (p[0]+p[1])/2]]));
}
// Testing functions

function pixelEq (p1, p2) {
  const epsilon = 0.004; // increase for repeated storing & rounding
  return [0,1,2].every(i => Math.abs(p1[i] - p2[i]) <= epsilon);
};

let robotCopy = robot.copy();
//mapLine(robotCopy, 100, p => [1, 0, 1]);
//mapLine(robotCopy, -1, p => [1, 0, 1]);
//mapLine(robotCopy, 0, p => [1, 0, 1]);
mapLine(robotCopy, 213, p => [1, 0, 1]);
mapLine(robotCopy, 215, p => [1, 0, 1]);
mapLine(robotCopy, 100, p => [1, 0, 1]);

robot.show();
removeRed(robot).show();
flipColors(robot).show();
mapToGB(robot).show();
mapFlipColors(robot).show();
robotCopy.show();

test('Check pixel equality', function() {
  const inputPixel = [0.5, 0.5, 0.5]
  // Create a test image, of size 10 pixels x 10 pixels, and set it to the inputPixel
  const image = lib220.createImage(10, 10, inputPixel);
  // Process the image.
  const outputImage = removeRed(image);
  // Check the center pixel.
  const centerPixel = outputImage.getPixel(5, 5);
  assert(pixelEq(centerPixel, [0, 0.5, 0.5]));
  // Check the top-left corner pixel.
  const cornerPixel = outputImage.getPixel(0, 0);
  assert(pixelEq(cornerPixel, [0, 0.5, 0.5]));
});

test('removeRed function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  removeRed(white).getPixel(0,0);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(removeRed(white).getPixel(0,0), [0, 1, 1]));
});

test('removeRed function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  removeRed(white).getPixel(9,9);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(removeRed(white).getPixel(9,9), [0, 1, 1]));
});

test('removeRed function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  removeRed(white).getPixel(0,9);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(removeRed(white).getPixel(0,9), [0, 1, 1]));
});

test('No red in removeRed result', function() {
  // Create a test image, of size 10 pixels x 10 pixels, and set it to all white.
  const white = lib220.createImage(10, 10, [1,1,1]);
  // Get the result of the function.
  const shouldBeBG = removeRed(white);
  // Read the center pixel.
  const pixelValue = shouldBeBG.getPixel(5, 5);
  // The red channel should be 0.
  assert(pixelValue[0] === 0);
  // The green channel should be unchanged.
  assert(pixelValue[1] === 1);
  // The blue channel should be unchanged.
  assert(pixelValue[2] === 1);
});

test('flipColors function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  flipColors(white).getPixel(0,0);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(flipColors(white).getPixel(0,0), [1, 1, 1]));
});

test('flipColors function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  flipColors(white).getPixel(9,9);
  // Checks that code runs. Need to use assert to check properties.
   assert(pixelEq(flipColors(white).getPixel(9,9), [1, 1, 1]));
});

test('flipColors function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  flipColors(white).getPixel(0,9);
  // Checks that code runs. Need to use assert to check properties.
   assert(pixelEq(flipColors(white).getPixel(0,9), [1, 1, 1]));
});

test('Color intensities should be flipped', function() {
  // Create a test image, of size 10 pixels x 10 pixels, and set it to all white.
  const white = lib220.createImage(10, 10, [1,1,1]);
  // Get the result of the function.
  const shouldBeFlipped = flipColors(white);
  // Read the center pixel.
  const pixelValue = shouldBeFlipped.getPixel(5, 5);
  // The red channel should be 0.
  assert(pixelValue[0] === (pixelValue[1] + pixelValue[2])/2);
  // The green channel should be unchanged.
  assert(pixelValue[1] === (pixelValue[0] + pixelValue[2])/2);
  // The blue channel should be unchanged.
  assert(pixelValue[2] === (pixelValue[0] + pixelValue[1])/2);
});

test('mapToGB function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  mapToGB(white).getPixel(0,0);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(mapToGB(white).getPixel(0,0), [0, 1, 1]));
});

test('mapToGB function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  mapToGB(white).getPixel(9,9);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(mapToGB(white).getPixel(9,9), [0, 1, 1]));
});

test('mapToGB function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  mapToGB(white).getPixel(0,9);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(mapToGB(white).getPixel(0,9), [0, 1, 1]));
});

test('mapFlipColors function definition is correct', function() {
  const white = lib220.createImage(10, 10, [0.1,0.2,0.3]);
  mapFlipColors(white).getPixel(0,0);
  // Checks that code runs. Need to use assert to check properties.
  console.log(mapFlipColors(white).getPixel(0,0));
  //console.log(pixelEq(mapFlipColors(white).getPixel(0,0), [0.25, 0.2, 0.15]));
  assert(pixelEq(mapFlipColors(white).getPixel(0,0), [0.25, 0.2, 0.15]));
});

test('mapFlipColors function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  mapFlipColors(white).getPixel(9,9);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(mapFlipColors(white).getPixel(9,9), [1, 1, 1]));
});

test('mapFlipColors function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  mapFlipColors(white).getPixel(0,9);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(mapFlipColors(white).getPixel(0,9), [1, 1, 1]));
});

test('Color intensities should be flipped', function() {
  // Create a test image, of size 10 pixels x 10 pixels, and set it to all white.
  const white = lib220.createImage(10, 10, [1,1,1]);
  // Get the result of the function.
  const shouldBeFlipped = mapFlipColors(white);
  // Read the center pixel.
  const pixelValue = shouldBeFlipped.getPixel(5, 5);
  // The red channel should be 0.
  assert(pixelValue[0] === (pixelValue[1] + pixelValue[2])/2);
  // The green channel should be unchanged.
  assert(pixelValue[1] === (pixelValue[0] + pixelValue[2])/2);
  // The blue channel should be unchanged.
  assert(pixelValue[2] === (pixelValue[0] + pixelValue[1])/2);
});

test('mapLine function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  let whiteCopy = white.copy();
  mapLine(whiteCopy, 5, p => [1, 0, 1]);
  whiteCopy.getPixel(0, 5);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(whiteCopy.getPixel(0, 5), [1, 0, 1]));
});

test('mapLine function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  let whiteCopy = white.copy();
  mapLine(whiteCopy, 5, p => [0.78, 0.25, 1]);
  whiteCopy.getPixel(0, 5);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(whiteCopy.getPixel(0, 5), [0.78, 0.25, 1]));
});

test('imageMap function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  imageMap(white, p => [0.0, p[1], p[2]]).getPixel(0,0);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(imageMap(white, p => [0.0, p[1], p[2]]).getPixel(0,0), [0, 1, 1]));
});

test('imageMap function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  imageMap(white, p => [0.0, p[1], p[2]]).getPixel(0,0);
  // Checks that code runs. Need to use assert to check properties.
  assert(pixelEq(imageMap(white, p => [0.5, 0.5, 0.5]).getPixel(0,0), [0.5, 0.5, 0.5]));
});

imageMapCoord(robot, (img, x, y) => [img.getPixel(x, y)[0], 0, 0]).show();
imageMapIf(robot, (imgCopy, x, y) => (x % 10 === 0), p => [1, 0, 0]).show();
//mapWindow(robot, 0, 0, 500, 500,  p => [1,0,0]).show();
makeBorder(robot, 106.5, p => [1, 0, 0]).show();
redBorder(robot, 50).show();
grayBorder(robot, 25).show();
dimCenter(robot, 0).show();

test('imageMapCoord function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = imageMapCoord(inputImage, (image, x, y) => image.getPixel(x, y));
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 0)); // every pixel channel is 0
  assert(inputImage !== outputImage); // output should be a different image object
});

test('identity function with imageMapCoord', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
  inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]);
  inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
  let outputImage = imageMapCoord(inputImage, (image, x, y ) => [image.getPixel(x, y)[0], 0, 0]);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0, 0]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.9, 0, 0]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0, 0]));
});

test('imageMapIf function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = imageMapIf(inputImage, (imgCopy, x, y) => (x % 10 === 0), p => [0, 0, 0]);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 0)); // every pixel channel is 0
  assert(inputImage !== outputImage); // output should be a different image object
});

test('identity function with imageMapIf', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = imageMapIf(inputImage, (imgCopy, x, y) => (x % 10 === 0), p => [1, 1, 1]);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('mapWindow function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = mapWindow(inputImage, 0, 0, 9, 9, p => [1, 1, 1]);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 1)); // every pixel channel is 1
  assert(inputImage !== outputImage); // output should be a different image object
});

test('modifies pixels in specified interval with mapWindow', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = mapWindow(inputImage, 0, 0, 9, 9, p => [0.2, 0.2, 0.2]);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('modifies pixels in specified interval with mapWindow', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = mapWindow(inputImage, -1, -1, 10, 10, p => [0.2, 0.2, 0.2]);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('modifies pixels in specified interval with mapWindow', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = mapWindow(inputImage, 0, 0, 5, 5, p => [1, 1, 1]);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(5, 5), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('modifies pixels in specified interval with mapWindow', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = mapWindow(inputImage, 5, 5, 5, 5, p => [1, 1, 1]);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('modifies pixels in specified interval with mapWindow', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = mapWindow(inputImage, -1, -1, 0, 0, p => [0.75, 0.75, 0.75]);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.75, 0.75, 0.75]));
  assert(pixelEq(outputImage.getPixel(5, 5), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(2, 8), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(9, 9), [1, 1, 1]));
});

test('modifies pixels in specified interval with mapWindow', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = mapWindow(inputImage, 0, 0, 0, 0, p => [0.75, 0.75, 0.75]);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.75, 0.75, 0.75]));
  assert(pixelEq(outputImage.getPixel(5, 5), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(2, 8), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(9, 9), [1, 1, 1]));
});

test('modifies pixels in specified interval with mapWindow', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = mapWindow(inputImage, 10, 10, -1, -1, p => [0.2, 0.2, 0.2]);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(5, 5), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(2, 8), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(9, 9), [1, 1, 1]));
});

test('makeBorder function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = makeBorder(inputImage, 10, p => [1, 1, 1]);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 1)); // every pixel channel is 1
  assert(inputImage !== outputImage); // output should be a different image object
});

test('makeBorder function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = makeBorder(inputImage, 0, p => [1, 1, 1]);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 0)); // every pixel channel is 1
  assert(inputImage !== outputImage); // output should be a different image object
});

test('only border pixels changed with makeBorder', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = makeBorder(inputImage, 10, p => [1, 1, 1]);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(5, 5), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(2, 8), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(9, 9), [1, 1, 1]));
});

test('only border pixels changed with makeBorder', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = makeBorder(inputImage, undefined, p => [1, 1, 1]);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('only border pixels changed with makeBorder', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = makeBorder(inputImage, null, p => [1, 1, 1]);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('only border pixels changed with makeBorder', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = makeBorder(inputImage, 2.7, p => [1, 1, 1]);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(6, 6), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(9, 9), [1, 1, 1]));
});

test('dimCenter function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = dimCenter(inputImage, 25);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 1)); // every pixel channel is 1
  assert(inputImage !== outputImage); // output should be a different image object
});

test('pixels not included in thickness are dimmed dimCenter', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
  inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]);
  inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
  let outputImage = dimCenter(inputImage, 10);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0.5, 0.5]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.1, 0.2, 0.3]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.9, 0.7, 0.8]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('pixels not included in thickness are dimmed dimCenter', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = dimCenter(inputImage, 9);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('pixels not included in thickness are dimmed dimCenter', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = dimCenter(inputImage, 5);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('pixels not included in thickness are dimmed dimCenter', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = dimCenter(inputImage, 4);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(4, 4), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(4, 5), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(5, 4), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('pixels not included in thickness are dimmed dimCenter', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = dimCenter(inputImage, 0);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.16, 0.16, 0.16]));
});

test('pixels not included in thickness are dimmed dimCenter', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = dimCenter(inputImage, -1);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.16, 0.16, 0.16]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.16, 0.16, 0.16]));
});

test('redBorder function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = redBorder(inputImage, 10);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p[0] === 1); // red pixel channel should be 1
  assert(p[1] === 0); // red pixel channel should be 1
  assert(p[1] === 0); // red pixel channel should be 1
  assert(inputImage !== outputImage); // output should be a different image object
});

test('Only red in border of redBorder result', function() {;
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = redBorder(inputImage, 10);
  // Setting different pixels' channels to different intensities should not
  // change the outputImage to anything different than [1, 0, 0]
  inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
  inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]);
  inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(5, 5), [1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(2, 8), [1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(9, 9), [1, 0, 0]));
});

test('Only red in border of redBorder result', function() {;
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = redBorder(inputImage, 0);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('Only red in border of redBorder result', function() {;
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = redBorder(inputImage, 5);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(5, 5), [1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(2, 8), [1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(9, 9), [1, 0, 0]));
});

test('Only red in border of redBorder result', function() {;
  let inputImage = lib220.createImage(10, 10, [0.275, 0.275, 0.275]);
  let outputImage = redBorder(inputImage, 4);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(4, 4), [0.275, 0.275, 0.275]));
  assert(pixelEq(outputImage.getPixel(4, 5), [0.275, 0.275, 0.275]));
  assert(pixelEq(outputImage.getPixel(5, 4), [0.275, 0.275, 0.275]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.275, 0.275, 0.275]));
  assert(pixelEq(outputImage.getPixel(2, 8), [1, 0, 0]));
  assert(pixelEq(outputImage.getPixel(9, 9), [1, 0, 0]));
});

test('Only red in border of redBorder result', function() {;
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  let outputImage = redBorder(inputImage, -1);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('grayBorder function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = grayBorder(inputImage, 10);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 0)); // every pixel channel is 0 bc 0/3 = 0
  assert(inputImage !== outputImage); // output should be a different image object
});

test('Only gray in border of grayBorder result', function() {
  let inputImage = lib220.createImage(10, 10, [0.2, 0.2, 0.2]);
  inputImage.setPixel(0, 0, [0.5, 0.5, 0.5]);
  inputImage.setPixel(5, 5, [0.1, 0.2, 0.3]);
  inputImage.setPixel(2, 8, [0.9, 0.7, 0.8]);
  let outputImage = grayBorder(inputImage, 10);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.5, 0.5, 0.5]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.2, 0.2]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.8, 0.8, 0.8]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.2, 0.2]));
});

test('Only gray in border of grayBorder result', function() {;
  let inputImage = lib220.createImage(10, 10, [0.2, 0.7, 0.4]);
  let outputImage = grayBorder(inputImage, -1);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.2, 0.7, 0.4]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.2, 0.7, 0.4]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.2, 0.7, 0.4]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.2, 0.7, 0.4]));
});


test('Only gray in border of grayBorder result', function() {;
  let inputImage = lib220.createImage(10, 10, [0.5, 1, 0.5]);
  let outputImage = grayBorder(inputImage, 4);
  assert(pixelEq(outputImage.getPixel(0, 0), [2/3, 2/3, 2/3]));
  assert(pixelEq(outputImage.getPixel(4, 4), [0.5, 1, 0.5]));
  assert(pixelEq(outputImage.getPixel(4, 5), [0.5, 1, 0.5]));
  assert(pixelEq(outputImage.getPixel(5, 4), [0.5, 1, 0.5]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.5, 1, 0.5]));
  assert(pixelEq(outputImage.getPixel(2, 8), [2/3, 2/3, 2/3]));
  assert(pixelEq(outputImage.getPixel(9, 9), [2/3, 2/3, 2/3]));
});

test('Only gray in border of grayBorder result', function() {;
  let inputImage = lib220.createImage(10, 10, [0.1, 0.7, 0.1]);
  let outputImage = grayBorder(inputImage, 5);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.3, 0.3, 0.3]));
  assert(pixelEq(outputImage.getPixel(5, 5), [0.3, 0.3, 0.3]));
  assert(pixelEq(outputImage.getPixel(2, 8), [0.3, 0.3, 0.3]));
  assert(pixelEq(outputImage.getPixel(9, 9), [0.3, 0.3, 0.3]));
});

let imgTest = lib220.loadImageFromURL('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzeT9m8lsWvSnM7tVKP7WMXUOywek7rjQIGQ&usqp=CAU');
let imgTest2 = lib220.loadImageFromURL('https://media1.popsugar-assets.com/files/thumbor/hKkvCgJXoOHXZHECFIarhZ261-E/160x160/filters:format_auto-!!-:strip_icc-!!-:sharpen-!1,0,true!-/2020/05/14/030/n/1922729/db4a35ef9d92e308_ClassPass_Zoom-background_9/i/Aerial-Yoga-Studio-Zoom-Background.jpg');
let imgTest3 = lib220.loadImageFromURL('https://textures.world/wp-content/uploads/2018/10/High-Voltage-Seamless-Background-Textures-2-150x150.jpg');
//combineThree(robot).show();
//imgTest.show();
//imgTest2.show();
//imgTest3.show();

//imageBlur(imgTest3).show();
//robot.show();

/*
for (let i = 140; i < 151; ++i) {
  composeFunctions(lineBlur3p(robot, i));
}
robot.show();

let robotCopy = robot.copy();
for (let i = 140; i < 151; ++i) {
  lineBlur3p(robotCopy, i);
}
for (let i = 50; i < 90; ++i) {
  lineBlur5p(robotCopy, i);
}
robotCopy.show();
*/

test('lineBlur3p function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  lineBlur3p(inputImage, 0);
  let p = inputImage.getPixel(0, 0);
  let p1 = inputImage.getPixel(4, 0);
  let p2 = inputImage.getPixel(9, 0);
  assert(p.every(c => c === 1)); // every pixel channel is 1
  assert(p1.every(c => c === 1)); // every pixel channel is 1
  assert(p2.every(c => c === 1)); // every pixel channel is 1
});

test('lineBlur3p function when invalid input', function() {
  let inputImage = lib220.createImage(10, 10, [1, 0, 1]);
  lineBlur3p(inputImage, -1);
  assert(pixelEq(inputImage.getPixel(0, 0), [1, 0, 1]));
});

test('lineBlur3p function when invalid input', function() {
  let inputImage = lib220.createImage(10, 10, [1, 0, 1]);
  lineBlur3p(inputImage, 1.5);
  assert(pixelEq(inputImage.getPixel(0, 0), [1, 0, 1]));
});

test('lineBlur3p function for 1x1 image', function() {
  let inputImage = lib220.createImage(1, 1, [1, 0, 1]);
  lineBlur3p(inputImage, 0);
  assert(pixelEq(inputImage.getPixel(0, 0), [1, 0, 1]));
});

test('lineBlur3p function for size of 1x2 image', function() {
  let inputImage = lib220.createImage(1, 2, [1, 0, 1]);
  inputImage.setPixel(0, 1, [0, 1, 0]);
  lineBlur3p(inputImage, 0);
  assert(pixelEq(inputImage.getPixel(0, 0), [1, 0, 1]));
  assert(pixelEq(inputImage.getPixel(0, 1), [0, 1, 0]));
});

test('lineBlur3p function for 2x2 image', function() {
  let inputImage = lib220.createImage(2, 2, [1, 0, 1]);
  inputImage.setPixel(0, 1, [1,1,0]);
  inputImage.setPixel(1, 1, [0,1,0]);
  lineBlur3p(inputImage, 1);
  assert(pixelEq(inputImage.getPixel(0, 1), [2/3, 1, 0]));
  assert(pixelEq(inputImage.getPixel(1, 1), [1/3, 1, 0]));
});

test('lineBlur3p function for 3x3 image', function() {
  let inputImage = lib220.createImage(3, 3, [1, 0, 1]);
  inputImage.setPixel(0, 1, [1,1,0]);
  inputImage.setPixel(1, 1, [0,1,0]);
  lineBlur3p(inputImage, 1);
  assert(pixelEq(inputImage.getPixel(0, 1), [2/3, 1, 0]));
  assert(pixelEq(inputImage.getPixel(1, 1), [2/3, 2/3, 1/3]));
  assert(pixelEq(inputImage.getPixel(2, 1), [2/3, 1/3, 2/3]));
});

test('lineBlur3p function for 6x6 image', function() {
  let inputImage = lib220.createImage(6, 6, [0, 0, 0]);
  inputImage.setPixel(0, 5, [1,1,1]); //[1, 2/3, 1]
  inputImage.setPixel(1, 5, [1,0,1]); //[2/3, 2/3, 1]
  inputImage.setPixel(2, 5, [0,1,1]);
  inputImage.setPixel(3, 5, [1,1,0]); //[1/3, 1, 1/3]
  inputImage.setPixel(4, 5, [0,1,0]);
  inputImage.setPixel(5, 5, [1,1,1]); //[2/3, 1, 2/3]
  lineBlur3p(inputImage, 5);
  assert(pixelEq(inputImage.getPixel(0, 5), [1, 2/3, 1]));
  assert(pixelEq(inputImage.getPixel(1, 5), [2/3, 2/3, 1]));
  assert(pixelEq(inputImage.getPixel(3, 5), [1/3, 1, 1/3]));
  assert(pixelEq(inputImage.getPixel(5, 5), [2/3, 1, 2/3]));
});

test('lineBlur5p function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  lineBlur5p(inputImage, 0);
  let p = inputImage.getPixel(0, 0);
  let p1 = inputImage.getPixel(4, 0);
  let p2 = inputImage.getPixel(9, 0);
  assert(p.every(c => c === 1)); // every pixel channel is 1
  assert(p1.every(c => c === 1)); // every pixel channel is 1
  assert(p2.every(c => c === 1)); // every pixel channel is 1
});

test('lineBlur5p function when invalid input', function() {
  let inputImage = lib220.createImage(10, 10, [1, 0, 1]);
  lineBlur5p(inputImage, -1);
  assert(pixelEq(inputImage.getPixel(0, 0), [1, 0, 1]));
});

test('lineBlur5p function when invalid input', function() {
  let inputImage = lib220.createImage(10, 10, [1, 0, 1]);
  lineBlur5p(inputImage, 1.5);
  assert(pixelEq(inputImage.getPixel(0, 0), [1, 0, 1]));
});

test('lineBlur5p function for size of 1x1 image', function() {
  let inputImage = lib220.createImage(1, 1, [1, 0, 1]);
  lineBlur5p(inputImage, 0);
  assert(pixelEq(inputImage.getPixel(0, 0), [1, 0, 1]));
});

test('lineBlur5p function for size of 1x2 image', function() {
  let inputImage = lib220.createImage(1, 2, [1, 0, 1]);
  inputImage.setPixel(0, 1, [0, 1, 0]);
  lineBlur5p(inputImage, 0);
  assert(pixelEq(inputImage.getPixel(0, 0), [1, 0, 1]));
  assert(pixelEq(inputImage.getPixel(0, 1), [0, 1, 0]));
});

test('lineBlur5p function for size of 2x2 image', function() {
  let inputImage = lib220.createImage(2, 2, [1, 0, 1]);
  inputImage.setPixel(0,0, [0, 1, 0]);
  lineBlur5p(inputImage, 0);
  assert(pixelEq(inputImage.getPixel(0, 0), [1/5, 4/5, 1/5]));
  assert(pixelEq(inputImage.getPixel(1, 0), [4/5, 1/5, 4/5]));
});

test('lineBlur5p function for size of 3x3 image', function() {
  let inputImage = lib220.createImage(3, 3, [1, 0, 1]);
  inputImage.setPixel(0,0, [0, 1, 1]);
  inputImage.setPixel(1,0, [0, 1, 0]);
  inputImage.setPixel(2,0, [1, 1, 0]);
  lineBlur5p(inputImage, 0);
  assert(pixelEq(inputImage.getPixel(0, 0), [1/5, 1, 3/5]));
  assert(pixelEq(inputImage.getPixel(1, 0), [1/5, 1, 1/5]));
  assert(pixelEq(inputImage.getPixel(2, 0), [3/5, 1, 1/5]));
});

test('lineBlur5p function for size of 4x4 image', function() {
  let inputImage = lib220.createImage(4, 4, [1, 0, 1]);
  inputImage.setPixel(0,0, [0, 1, 1]);
  inputImage.setPixel(1,0, [0, 1, 0]);
  inputImage.setPixel(2,0, [1, 1, 0]);
  inputImage.setPixel(3,0, [1, 1, 1]);
  lineBlur5p(inputImage, 0);
  assert(pixelEq(inputImage.getPixel(0, 0), [1/5, 1, 3/5]));
  assert(pixelEq(inputImage.getPixel(1, 0), [2/5, 1, 2/5]));
  assert(pixelEq(inputImage.getPixel(2, 0), [3/5, 1, 2/5]));
  assert(pixelEq(inputImage.getPixel(3, 0), [4/5, 1, 3/5]));
});

test('lineBlur5p function for size of 5x5 image', function() {
  let inputImage = lib220.createImage(5, 5, [1, 0, 1]);
  inputImage.setPixel(0,0, [0, 1, 1]);
  inputImage.setPixel(1,0, [0, 1, 0]);
  inputImage.setPixel(2,0, [1, 1, 0]);
  inputImage.setPixel(3,0, [1, 1, 1]);
  inputImage.setPixel(4,0, [1, 0, 1]);
  lineBlur5p(inputImage, 0);
  assert(pixelEq(inputImage.getPixel(0, 0), [1/5, 1, 3/5]));
  assert(pixelEq(inputImage.getPixel(1, 0), [2/5, 1, 2/5]));
  assert(pixelEq(inputImage.getPixel(2, 0), [3/5, 4/5, 3/5]));
  assert(pixelEq(inputImage.getPixel(3, 0), [4/5, 4/5, 3/5]));
  assert(pixelEq(inputImage.getPixel(4, 0), [1, 2/5, 4/5]));
});

test('lineBlur5p function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  inputImage.setPixel(0, 5, [1,1,1]); //[4/5, 3/5, 4/5]
  inputImage.setPixel(2, 5, [1,0,1]); 
  inputImage.setPixel(4, 5, [0,1,1]);
  inputImage.setPixel(6, 5, [1,1,0]); //[1/5, 3/5, 1/5]
  inputImage.setPixel(8, 5, [0,1,0]);
  inputImage.setPixel(9, 5, [1,1,1]); //[3/5, 4/5, 3/5]
  lineBlur5p(inputImage, 5);
  assert(pixelEq(inputImage.getPixel(0, 5), [4/5, 3/5, 4/5]));
  assert(pixelEq(inputImage.getPixel(1, 5), [2/5, 1/5, 2/5]));
  assert(pixelEq(inputImage.getPixel(6, 5), [1/5, 3/5, 1/5]));
  assert(pixelEq(inputImage.getPixel(9, 5), [3/5, 4/5, 3/5]));
});

test('blurLines function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [0, 0, 0]);
  let outputImage = blurLines(inputImage, lineBlur3p);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 0)); // every pixel channel is 0
  assert(inputImage !== outputImage); // output should be a different image object
});

test('blurLines function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = blurLines(inputImage, lineBlur5p);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 1)); // every pixel channel is 1
});

test('blurLines function on 5x5 image', function() {
  let inputImage = lib220.createImage(5, 5, [1, 1, 1]);
  inputImage.setPixel(0, 3, [0,1,1]); 
  inputImage.setPixel(2, 4, [1,0,1]); 
  inputImage.setPixel(3, 4, [0,1,1]);
  inputImage.setPixel(2, 2, [1,1,0]); 
  inputImage.setPixel(0, 2, [0,1,0]);
  inputImage.setPixel(1, 3, [1,0,1]);
  let outputImage = blurLines(inputImage, lineBlur3p);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 1, 1]));
  assert(pixelEq(outputImage.getPixel(4, 4), [2/3, 1, 1]));
  assert(pixelEq(outputImage.getPixel(2, 3), [1, 2/3, 1]));
  assert(pixelEq(outputImage.getPixel(1, 2), [2/3, 1, 1/3]));
}); 

test('blurLines function definition is correct', function() {
  let inputImage = lib220.createImage(1, 1, [0.75, 0.5, 1]);
  let outputImage = blurLines(inputImage, lineBlur3p);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.75, 0.5, 1]));
}); 

test('pixelBlur function should not modify', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  pixelBlur(inputImage, 5, 5);
  let p = inputImage.getPixel(5, 5); // output should be an image, getPixel works
  assert(p.every(c => c === 1)); // every pixel channel is 1
});

test('pixelBlur function for invalid inputs', function() {
  let inputImage = lib220.createImage(5, 5, [1, 0, 1]);
  let outputImage = inputImage.copy();
  inputImage.setPixel(0, 0, [0, 1, 1]);
  inputImage.setPixel(1, 0, [0, 1, 0]);
  inputImage.setPixel(0, 1, [0, 1, 1]);
  // Goes into if statement which prints invalid and returns nothing
  pixelBlur(inputImage, 0, -2); 
  pixelBlur(inputImage, 1, -2); 
  pixelBlur(inputImage, -1, -2); 
});

test('pixelBlur function definition is correct', function() {
  let inputImage = lib220.createImage(1, 1, [1, 0, 1]);
  inputImage.setPixel(0, 0, [0, 1, 1]);
  inputImage.setPixel(0, 0, pixelBlur(inputImage, 0, 0));
  assert(pixelEq(inputImage.getPixel(0, 0), [0, 1, 1]));
});

test('pixelBlur function definition is correct', function() {
  let inputImage = lib220.createImage(2, 2, [1, 0, 1]);
  let outputImage = inputImage.copy();
  inputImage.setPixel(0, 0, [0, 1, 1]);
  inputImage.setPixel(1, 0, [0, 1, 0]);
  inputImage.setPixel(0, 1, [0, 1, 1]);
  outputImage.setPixel(0, 0, pixelBlur(inputImage, 0, 0));
  outputImage.setPixel(1, 0, pixelBlur(inputImage, 1, 0));
  outputImage.setPixel(0, 1, pixelBlur(inputImage, 0, 1));
  outputImage.setPixel(1, 1, pixelBlur(inputImage, 1, 1));
  assert(pixelEq(outputImage.getPixel(0, 0), [1/4, 3/4, 3/4]));
  assert(pixelEq(outputImage.getPixel(1, 0), [1/4, 3/4, 3/4]));
  assert(pixelEq(outputImage.getPixel(0, 1), [1/4, 3/4, 3/4]));
  assert(pixelEq(outputImage.getPixel(1, 1), [1/4, 3/4, 3/4]));
});

test('pixelBlur function definition is correct', function() {
  let inputImage = lib220.createImage(2, 2, [1, 0, 1]);
  let outputImage = inputImage.copy();
  inputImage.setPixel(0, 0, [0, 1, 1]);
  inputImage.setPixel(1, 0, [0, 1, 0]);
  inputImage.setPixel(0, 1, [0, 1, 1]);
  inputImage.setPixel(0, 0, pixelBlur(inputImage, 0, 0)); //[1/4, 3/4, 3/4]
  inputImage.setPixel(1, 0, pixelBlur(inputImage, 1, 0)); //[5/16, 11/16, 11/16]
  inputImage.setPixel(0, 1, pixelBlur(inputImage, 0, 1));
  assert(pixelEq(inputImage.getPixel(0, 0), [1/4, 3/4, 3/4]));
  assert(pixelEq(inputImage.getPixel(1, 0), [5/16, 11/16, 11/16]));
});

test('pixelBlur function definition is correct', function() {
  let inputImage = lib220.createImage(3, 3, [1, 0, 1]);
  let outputImage = inputImage.copy();
  inputImage.setPixel(0, 0, [0, 1, 1]);
  inputImage.setPixel(1, 0, [0, 1, 0]);
  inputImage.setPixel(0, 1, [0, 1, 1]);
  inputImage.setPixel(2, 0, [0, 0, 0]);
  inputImage.setPixel(2, 1, [1, 1, 1]);
  outputImage.setPixel(0, 0, pixelBlur(inputImage, 0, 0));
  outputImage.setPixel(1, 0, pixelBlur(inputImage, 1, 0));
  outputImage.setPixel(0, 1, pixelBlur(inputImage, 0, 1));
  outputImage.setPixel(1, 1, pixelBlur(inputImage, 1, 1));
  outputImage.setPixel(0, 2, pixelBlur(inputImage, 0, 2));
  outputImage.setPixel(2, 0, pixelBlur(inputImage, 2, 0));
  outputImage.setPixel(2, 2, pixelBlur(inputImage, 2, 2));
  assert(pixelEq(outputImage.getPixel(0, 0), [1/4, 3/4, 3/4]));
  assert(pixelEq(outputImage.getPixel(1, 0), [1/3, 2/3, 2/3]));
  assert(pixelEq(outputImage.getPixel(0, 1), [1/2, 1/2, 5/6]));
  assert(pixelEq(outputImage.getPixel(1, 1), [5/9, 4/9, 7/9]));
  assert(pixelEq(outputImage.getPixel(0, 2), [3/4, 1/4, 1]));
  assert(pixelEq(outputImage.getPixel(2, 0), [1/2, 1/2, 1/2]));
  assert(pixelEq(outputImage.getPixel(2, 2), [1, 1/4, 1]));
});

test('imageBlur function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = imageBlur(inputImage);
  let p = outputImage.getPixel(0, 0); // output should be an image, getPixel works
  assert(p.every(c => c === 1)); // every pixel channel is 1
  assert(inputImage !== outputImage); // output should be a different image object
});

test('imageBlur function definition is correct', function() {
  let inputImage = lib220.createImage(1, 1, [0.25, 0.25, 0.25]);
  let outputImage = imageBlur(inputImage);
  assert(pixelEq(outputImage.getPixel(0, 0), [0.25, 0.25, 0.25]));
});

test('imageBlur function definition is correct', function() {
  let inputImage = lib220.createImage(5, 5, [1, 1, 1]);
  inputImage.setPixel(0, 3, [0,1,1]); 
  inputImage.setPixel(0, 1, [1,1,0]); 
  inputImage.setPixel(1, 0, [1,1,0]); 
  inputImage.setPixel(3, 0, [0,0,0]);
  inputImage.setPixel(3, 1, [0,1,0]); 
  inputImage.setPixel(4, 2, [1,0,1]); 
  inputImage.setPixel(2, 4, [1,0,1]); 
  inputImage.setPixel(3, 4, [0,1,1]);
  inputImage.setPixel(2, 2, [1,1,0]); 
  inputImage.setPixel(0, 2, [0,1,0]);
  inputImage.setPixel(1, 3, [1,0,1]);
  let outputImage = imageBlur(inputImage);
  assert(pixelEq(outputImage.getPixel(0, 0), [1, 1, 1/2]));
  assert(pixelEq(outputImage.getPixel(0, 4), [3/4, 3/4, 1]));
  assert(pixelEq(outputImage.getPixel(4, 0), [1/2, 3/4, 1/2]));
  assert(pixelEq(outputImage.getPixel(4, 4), [3/4, 1, 1]));
  assert(pixelEq(outputImage.getPixel(1, 1), [8/9, 1, 5/9]));
  assert(pixelEq(outputImage.getPixel(2, 2), [8/9, 8/9, 7/9]));
  assert(pixelEq(outputImage.getPixel(3, 3), [8/9, 7/9, 8/9]));
  assert(pixelEq(outputImage.getPixel(3, 1), [7/9, 7/9, 2/3]));
  assert(pixelEq(outputImage.getPixel(1, 3), [7/9, 7/9, 7/9]));
});

test('composeFunctions function definition is correct with one function', function() {
  let arrayfunc = [p => [0, p[1], p[2]]];
  let func = composeFunctions(arrayfunc);
  let pixel = [.75, .26, .89];
  assert(pixelEq(func(pixel), [0, .26, .89]));
});

test('composeFunctions with two functions', function() {
  let arrayfunc = [p => [0, p[1], p[2]], p => [(p[1]+p[2])/2, (p[0]+p[2])/2, (p[0]+p[1])/2]];
  let func = composeFunctions(arrayfunc);
  let pixel = [.75, .25, .25];
  assert(pixelEq(func(pixel), [.25, .25/2, .25/2]));
});

test('composeFunctions with two functions', function() {
  let arrayfunc = [p => [(p[1]+p[2])/2, (p[0]+p[2])/2, (p[0]+p[1])/2], p => [(p[1]+p[2])/2, (p[0]+p[2])/2, (p[0]+p[1])/2]];
  let func = composeFunctions(arrayfunc);
  let pixel = [.75, .25, .25]; // [.25, .5, .5] --> [.5, .75/2, .75/2]
  assert(pixelEq(func(pixel), [.5, .75/2, .75/2]));
});

test('composeFunctions with three functions', function() {
  let arrayfunc = [p => [0, p[1], p[2]], p => [(p[1]+p[2])/2, (p[0]+p[2])/2, (p[0]+p[1])/2], p => [(p[1]+p[2])/2, (p[0]+p[2])/2, (p[0]+p[1])/2]];
  let func = composeFunctions(arrayfunc);
  let pixel = [.25, .75, .25]; // [0, .75, .25] --> [.5, .25/2, .75/2] --> [.25, .4375, .3125]
  assert(pixelEq(func(pixel), [.25, .4375, .3125]));
});

test('composeFunctions with three functions', function() {
  let arrayfunc = [p => [p[2], p[0], p[1]], p => [(p[1]*p[2]), (p[0]*p[2]), (p[0]*p[1])], p => [p[1], p[2], p[0]]];
  let func = composeFunctions(arrayfunc);
  let pixel = [.25, .75, .25]; // [0.25, .25, .75] --> [.1875, .1875, .0625] --> [.1875, .0625, .1875]
  assert(pixelEq(func(pixel), [.1875, .0625, .1875]));
});

test('combineThree function definition is correct', function() {
  let inputImage = lib220.createImage(10, 10, [1, 1, 1]);
  let outputImage = combineThree(inputImage);
  assert(inputImage !== outputImage);
  assert(pixelEq(outputImage.getPixel(0, 0), [.5, .75, .75]));
  assert(pixelEq(outputImage.getPixel(5, 5), [.5, .75, .75]));
  assert(pixelEq(outputImage.getPixel(9, 9), [.5, .75, .75]));
});
