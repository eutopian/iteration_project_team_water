import React from 'react';
import Players from './Players';
import BlackCard from './BlackCard';
import CardDisplay from './CardDisplay';

const Room = ({maxUsers, numberOfUsers, waitingRoom}) => {
  const playing = () => {
    return (
      <div>
        <Players />
        <BlackCard />
        <CardDisplay />
      </div>
    )
  }
  const waiting = () => {
    return (
      <div className='room'>
        <p id='slots'>Current {numberOfUsers} / {maxUsers} Max</p>
        <button id='joinButton' type='button'>Join</button>
      </div>
    )
  }
  const view = waitingRoom ? waiting() : playing();

  return (
    <div>
      {view}
    </div>
  )
}

export default Room;