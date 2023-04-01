import dynamic from 'next/dynamic';

const MyReactPlayer = dynamic(() => import("jol-player"), { ssr: false });
export default MyReactPlayer;
