import React, { Component } from 'react';
import {BatteryContext,OnlineContext} from '../utils/Context'

class Leaf extends Component {
  render() {
    return (
     <BatteryContext.Consumer>
       {
         battery => (
            <OnlineContext.Consumer>
            {
              onLine => <h1>Battery:{battery} , OnLine:{String(onLine)}</h1>
            }
            </OnlineContext.Consumer>
         )
       }
     </BatteryContext.Consumer>
    );
  }
}

export default Leaf;