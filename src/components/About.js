import React from 'react';
import { useContext } from 'react';
import NoteContext from '../contexts/NoteContext';

export const About = () => {

   const first = useContext(NoteContext);

  return ( <>
     <div className='section '>
      <h2 className='title'>About page</h2>
    <div className='subtitle'> Hello There, This is your about page. This is passed <span className='has-text-danger'>{first.name} & he is {first.age} years old</span> </div>
    </div>
</>);
};