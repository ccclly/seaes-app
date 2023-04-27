import dynamic from 'next/dynamic';

const MyReactPlayer = dynamic(() => import("jol-player"), { ssr: false });
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
export default ReactPlayer;
