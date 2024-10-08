import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const followUser = async (followerId: string, followingId: string) => {
  // Increment followersCount for the following user
  const followedUser = await User.findByIdAndUpdate(
    followingId,
    { $inc: { followersCount: 1 } },
    { new: true }
  );

  // Increment followingCount for the follower user
  const followerUser = await User.findByIdAndUpdate(
    followerId,
    { $inc: { followingCount: 1 } },
    { new: true }
  );

  return { followedUser, followerUser };
};

const unfollowUser = async (followerId: string, followingId: string) => {
  // Decrement followersCount for the following user
  const unfollowedUser = await User.findByIdAndUpdate(
    followingId,
    { $inc: { followersCount: -1 } },
    { new: true }
  );

  // Decrement followingCount for the follower user
  const unfollowerUser = await User.findByIdAndUpdate(
    followerId,
    { $inc: { followingCount: -1 } },
    { new: true }
  );

  return { unfollowedUser, unfollowerUser };
};

const blockUser = async (userId: string) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }
  );

  return updatedUser;
};

const deleteUser = async (userId: string) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};

const updateUser = async (userId: string, updateData: Partial<TUser>) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure that validation rules are respected
  });

  return updatedUser;
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  followUser, // Add this line
  unfollowUser, // Add this line
  blockUser,
  deleteUser,
  updateUser,
};
