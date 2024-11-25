export type Pose = {
    id: string;
    time: number;
    image?: string;
    title?: string;
    description?: string;
  };
  
  export type Routine = {
    id: string;
    name: string;
    poses: { id: string; time: number }[];
  };
  