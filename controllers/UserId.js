import UserId from "../models/UserId.js";

export const generateNewUserId = async () => {
  const user = await UserId.findOne();

  if(!user){
    const newUser = new UserId({
        userId: "MA00000"
    });
    await newUser.save();
    console.log(newUser);
  }else{
    const {userId} = user;
    let left = userId.slice(0, 2);
    let right = userId.slice(2);
    let newRight = String(Number(right) + 1);
    let remLen = right.length - newRight.length;
    right = "";
    for(let i=0;i<remLen;i++){
        right += 0;
    }
    right += newRight;
    const newUserId = left + right;

    const newId = await UserId.findOneAndUpdate({
        userId: newUserId,
        new: true
    });

    return newId.userId;
  }
};
