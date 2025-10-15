import {makeProject} from '@motion-canvas/core';

import intro from './scenes/intro?scene';
import event from './scenes/event?scene';
import outro from './scenes/outro?scene';

export const data = {
  title: 'Como saír de Vim e algunha cousa máis',
  author: 'Miguel López',
  tags: ["GNU Linux", "Open Source", "Vim"],
  startDate: new Date("2025-03-11T18:30"),
  endDate: new Date("2025-03-11T20:00")
}

export default makeProject({
  experimentalFeatures: true,
  scenes: [intro, event, outro],
});
