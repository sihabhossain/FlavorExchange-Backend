import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const followUser = catchAsync(async (req, res) => {
  const { followingId } = req.body; // Expecting body to have followingId
  const followerId = req.user.id; // Assuming user ID is available in req.user

  const result = await UserServices.followUser(followerId, followingId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User followed successfully',
    data: result,
  });
});

const unfollowUser = catchAsync(async (req, res) => {
  const { followingId } = req.body; // Expecting body to have followingId
  const followerId = req.user.id; // Assuming user ID is available in req.user

  const result = await UserServices.unfollowUser(followerId, followingId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User unfollowed successfully',
    data: result,
  });
});

export const UserControllers = {
  getSingleUser,
  userRegister,
  getAllUsers,
  followUser,
  unfollowUser,
};
