import { hostname } from "os";

const nextConfig = {
  /* config options here */
  // images:{
  //   remotePatterns:[
  //     {
  //       protocol:'https',
  //       hostname:'www.images.pexels.com',
  //       port:'',
  //       pathname:'/**'
  //     }
  //   ]
  // }

  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**'
      },
      {
        protocol: 'https',
        hostname: 'bqawosrndwoggwtypxlj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      }
    ]
  }
};

export default nextConfig;