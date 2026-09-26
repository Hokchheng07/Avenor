export interface TeamMember {
  id: string;
  name: string;
  role: string;
  github: string;
  email: string
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Chhun Hokchheng",
    role: "FRONTEND",
    github: "Hokchheng07",
    email: "hokchheng019@gmail.com",
    image: "/Images/team/member.jpg",
  },
  {
    id: "2",
    name: "Ratana Oudom",
     role: "FRONTEND",
     github: "Oudom-Ratana",
     email:"ratanaoudom997@gmail.com",
    image: "/Images/team/member1.jpg",
  },
  {
    id: "3",
    name: "Kong Kimlong",
    role: "FRONTEND",
    github: "Kong-kimlong",
    email:"ounlong3699@gmail.com",
    image: "/Images/team/member2.jpg",
  },
  {
    id: "4",
    name: "Rith Sokheng",
    role: "FRONTEND",
    github: "rithsokheng",
    email: "ridhsokheng@protonmail.com",
    image: "/Images/team/member3.png",
  },
  {
    id: "5",
    name: "Rith Mengheang",
    role: "FRONTEND",
    github:"Rith-Mengheang",
    email: "mh4136596@gmail.com",
    image: "/Images/team/member4.jpg",
  },
  {
    id: "6",
    name: "Touch Phearak",
    role: "FRONTEND",
    github: "phearaktouch019-pixel",
    email: "phearaktouch019@gmail.com",
    image: "/Images/team/member5.jpg",
  },
];
export const mentors: TeamMember[] = [
  { 
    id: "m2", 
    name: " Srorng Socheat", 
    role: "MENTOR",
    github: "CheatDev07",
    email:"srorngsokcheat53@gmail.com",
    image: "/Images/menors/image.png" 
  },
];