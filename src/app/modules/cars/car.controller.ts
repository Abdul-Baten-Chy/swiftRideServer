//carsController.createCars

import { Request, Response } from 'express';
import catchAsyncAwait from '../../utills/catchAsyncAwait';
import sendResponse from '../../utills/sendResponse';
import { carServices } from './car.services';

const createCars = catchAsyncAwait(async (req: Request, res: Response) => {
  const payload = req.body;
  const cars = await carServices.createCarsIntoDB(payload);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Car created successfully',
    data: cars,
  });
});

// const getAllCars = catchAsyncAwait(async (req: Request, res: Response) => {
//   const allCars = await carServices.getAllCarsFromDB();
//   return sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Cars retrieved successfully',
//     data: allCars,
//   });
// });

// const getFilteredCar = catchAsyncAwait(async (req: Request, res: Response) => {
//   const { minPrice, maxPrice } = req.query;

//   // Build the query object
//   const query: any = {};

//   if (category) {
//     query.category = category;
//   }

//   if (minPrice || maxPrice) {
//     query.price = {};
//     if (minPrice) {
//       query.price.$gte = parseFloat(minPrice as string);
//     }
//     if (maxPrice) {
//       query.price.$lte = parseFloat(maxPrice as string);
//     }
//   }

//   const result = await productService.filterdProductsFromDB(query);
//   return sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Product filtered successfully',
//     data: result,
//   });
// });

//try
const getAllCars = catchAsyncAwait(async (req: Request, res: Response) => {
  const { minPrice, maxPrice, searchTerm } = req.query;

  // Build the query object
  const query: any = {};

  if (minPrice || maxPrice) {
    query.pricePerHour = {};
    if (minPrice) {
      query.pricePerHour.$gte = parseFloat(minPrice as string);
    }
    if (maxPrice) {
      query.pricePerHour.$lte = parseFloat(maxPrice as string);
    }
  }

  let result;

  if (searchTerm) {
    // If searchTerm is present, use search functionality
    result = await carServices.getAllCarsFromDB({
      name: new RegExp(searchTerm as string, 'i'),
    });
  } else {
    // If no searchTerm is present, use filtering functionality
    result = await carServices.getAllCarsFromDB(query);
  }
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: searchTerm
      ? 'Product search results retrieved successfully'
      : 'Product filtered successfully',
    data: result,
  });
});

//try end

const getSingleCars = catchAsyncAwait(async (req: Request, res: Response) => {
  const id = req.params.id;

  const car = await carServices.getSingleCarsfromDB(id);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'A Car retrieved successfully',
    data: car,
  });
});
const updateSingleCar = catchAsyncAwait(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await carServices.updateCarIntoDB(id, payload);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteAcar = catchAsyncAwait(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);

  const result = await carServices.deleteAcarFromDB(id);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Car Deleted successfully',
    data: result,
  });
});

const returnCar = async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await carServices.carReturn(payload);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Car Deleted successfully',
    data: result,
  });
};
export const carsController = {
  createCars,
  getAllCars,
  getSingleCars,
  deleteAcar,
  updateSingleCar,
  returnCar,
};
