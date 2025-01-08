import { LuUser } from "react-icons/lu";
import { currentUser } from '@clerk/nextjs/server';

async function UserIcon() {
  const user = await currentUser();
  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <img src={profileImage} className='w-6 h-6 rounded-full object-cover' />
    );
  }

  return <LuUser className='w-6 h-6 bg-primary rounded-full text-white' />;
}

export default UserIcon;


// import { currentUser, auth } from '@clerk/nextjs/server';
// import React from 'react';
// import { LuUser } from 'react-icons/lu';

// async function UserIcon() {
//   const user = await currentUser();

//   const profileImg = await user?.imageUrl;
//   console.log('profile :', profileImg)
//   if (profileImg) {
//     return (
//       <div>
//         <img src={profileImg} alt="user-icon" />
//       </div>
//   )}
//   return (<LuUser />)
// }

// export default UserIcon;