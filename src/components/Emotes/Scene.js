/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ParticleContainer, useApp, useTick } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import p2 from 'p2';
import moment from 'moment';

import idMap from './assets/idMap.json';
import sprites from './hype.json';

const { tmi } = window;
const { NODE_ENV, PUBLIC_URL } = process.env;

// Size constants.
const SCALE = 0.5;
const IMG_WIDTH = 112 * SCALE;
const MAX_OBJECTS = 200;
const MAX_AGE = 180;
const HYPE_DURATION = 30;

// Physics constants.
const OBJECT = 2 ** 0;
const WALL = 2 ** 1;
const GROUND = 2 ** 2;

function Scene({ width, height, auto, spam }) {
  const pixiApp = useApp();
  const [hypeActive, setHypeActive] = useState(false);
  const [spamActive, setSpamActive] = useState(spam);

  // Instance Variables.
  const hypeTimer = useRef(null);
  const objectList = useRef([]);
  const textures = useRef([]);

  // Construction.
  // eslint-disable-next-line new-cap
  const client = new tmi.client({
    options: {
      debug: NODE_ENV !== 'production'
    },
    connection: {
      reconnect: true,
      secure: true
    },
    channels: ['#avalonstar']
  });
  const world = new p2.World({ gravity: [0, -9.82] });
  const { loader } = pixiApp;

  const shuffleArray = (array, num) => {
    let target = num;
    if (num > array.length) {
      target = array.length;
    }
    const random = array.sort(() => 0.5 - Math.random()).slice(0, target);
    return random;
  };

  const createObject = useCallback(
    (autoCreate, cheer, emote) => {
      const object = {
        alive: true,
        created: moment(),
        render: null,
        physics: null
      };

      const x = Math.random() * width;
      const y = -1 * (IMG_WIDTH / 2 + 10);

      const angle = Math.random() * 360 * (Math.PI / 180);
      const angularVelocity = Math.random() * 5;

      const circleBody = new p2.Body({
        mass: Math.random() * 95 + 5,
        position: [x, y],
        angle,
        angularVelocity
      });
      const circleShape = new p2.Circle({ radius: IMG_WIDTH / 2 });
      circleBody.addShape(circleShape);
      circleShape.collisionGroup = OBJECT;
      circleShape.collisionMask = OBJECT | WALL | GROUND;

      object.physics = circleBody;
      world.addBody(circleBody);

      let spriteImg;

      if (emote) {
        spriteImg = textures.current[`${emote}.png`];
      } else {
        const emoteName =
          sprites[Math.floor(Math.random() * (sprites.length - 1))];
        spriteImg = textures.current[`${emoteName}.png`];
      }

      const blankObj = new PIXI.Sprite(spriteImg);
      blankObj.anchor.set(0.5);
      blankObj.scale.x = SCALE;
      blankObj.scale.y = SCALE;
      blankObj.x = x;
      blankObj.y = y;
      blankObj.rotation = angle;

      object.render = blankObj;

      pixiApp.stage.addChild(blankObj);

      objectList.current.push(object);

      if (auto && autoCreate) {
        setTimeout(() => createObject(true, false), Math.random() * 2 * 1000);
      }
    },
    [pixiApp, world, width, auto]
  );

  const handleSupport = useCallback(
    inputValue => {
      const value = parseInt(inputValue, 10);
      if (value >= 500) {
        setHypeActive(true);
        clearTimeout(hypeTimer.current);
        hypeTimer.current = setTimeout(
          setHypeActive(false),
          HYPE_DURATION * 1000
        );
      }
      const timesIntermediary = Math.round(Math.max(1, value / 100));
      const times = timesIntermediary;
      for (let i = 0; i < times; i += 1) {
        setTimeout(() => createObject(false), (i + 1) * 250);
      }
    },
    [createObject]
  );

  const handleEmotes = useCallback(
    emotes => {
      if (spamActive || hypeActive) {
        const acceptedEmotes = [];
        Object.keys(emotes).forEach(emote => {
          if (idMap[emote]) {
            for (let i = 0; i < emotes[emote].length; i += 1) {
              acceptedEmotes.push(idMap[emote]);
            }
          }
        });
        shuffleArray(acceptedEmotes, 15).forEach((emote, id) => {
          setTimeout(() => createObject(false, false, emote), (id + 1) * 350);
        });
      }
    },
    [spamActive, hypeActive, createObject]
  );

  const calculateSubValue = plan => {
    let value = 100;
    switch (plan) {
      case 'Prime':
      case '1000':
        value *= 5;
        break;
      case '2000':
        value *= 10;
        break;
      case '3000':
        value *= 25;
        break;
      default:
        value = 0;
        break;
    }

    return value;
  };

  const cleanup = useCallback(() => {
    const { current } = objectList;
    const outOfBounds = -1 * (height + IMG_WIDTH / 2 + 10);

    if (current.length > MAX_OBJECTS) {
      current.forEach((object, id) => {
        if (object.alive) {
          const age = moment().diff(object.created, 's');
          if (age > MAX_AGE / (4 * (current.length / MAX_OBJECTS))) {
            object.alive = false;
            object.physics.shapes[0].collisionMask = OBJECT | WALL;
          }
        } else if (object.physics.position[1] <= outOfBounds) {
          pixiApp.stage.removeChild(object.render);
          object.render.destroy();
          world.removeBody(object.physics);
          current.splice(id, 1);
        }
      });
    } else {
      current.forEach((object, id) => {
        if (object.alive) {
          const age = moment().diff(object.created, 's');
          if (age > MAX_AGE) {
            object.alive = false;
            object.physics.shapes[0].collisionMask = OBJECT | WALL;
          }
        } else if (object.physics.position[1] <= outOfBounds) {
          pixiApp.stage.removeChild(object.render);
          object.render.destroy();
          world.removeBody(object.physics);
          current.splice(id, 1);
        }
      });
    }
  }, [pixiApp, world, height]);

  const buildPhysics = useCallback(() => {
    world.setGlobalStiffness(1e4);
    world.setGlobalRelaxation(2);

    const groundBody = new p2.Body({
      mass: 0,
      position: [width / 2, -1 * (height + 10)]
    });
    const groundShape = new p2.Box({ width, height: 10 });
    groundBody.addShape(groundShape);
    world.addBody(groundBody);

    groundShape.collisionGroup = GROUND;

    const leftBody = new p2.Body({
      mass: 0,
      position: [-10, -1 * (height / 2)]
    });
    const leftShape = new p2.Box({ width: 10, height });
    leftBody.addShape(leftShape);
    world.addBody(leftBody);

    leftShape.collisionGroup = WALL;

    const rightBody = new p2.Body({
      mass: 0,
      position: [width + 10, -1 * (height / 2)]
    });
    const rightShape = new p2.Box({ width: 10, height });
    rightBody.addShape(rightShape);
    world.addBody(rightBody);

    rightShape.collisionGroup = WALL;

    const topBody = new p2.Body({ mass: 0, position: [width / 2, -10] });
    const topShape = new p2.Box({ width, height: 10 });
    topBody.addShape(topShape);
    world.addBody(topBody);

    topShape.collisionGroup = WALL;

    world.on('postStep', () => cleanup());
  }, [cleanup, world, height, width]);

  const setupTMI = useCallback(() => {
    client.on('subgift', (channel, username, recepient, method, userstate) => {
      handleSupport(calculateSubValue(method));
    });
    client.on(
      'subscription',
      (channel, username, method, message, userstate) => {
        handleSupport(calculateSubValue(method));
      }
    );
    client.on(
      'resub',
      (channel, username, months, message, userstate, method) => {
        handleSupport(calculateSubValue(method));
      }
    );
    client.on(
      'submysterygift',
      (channel, username, numbOfSubs, methods, userstate) => {
        for (let i = 0; i < numbOfSubs; i += 1) {
          handleSupport(calculateSubValue(methods));
        }
      }
    );
    client.on('message', (channel, user, message) => {
      if (user.emotes) {
        handleEmotes(user.emotes);
      } else if (
        message.indexOf('!') === 0 &&
        user.username === channel.replace('#', '')
      ) {
        const command = message
          .toLowerCase()
          .replace('!', '')
          .split(' ')
          .slice(0, 2)
          .join(' ');
        if (command === 'spam on') {
          setSpamActive(true);
        } else if (command === 'spam off') {
          setSpamActive(false);
        }
      }
    });

    client.connect();
  }, [client, handleEmotes, handleSupport]);

  useTick(delta => {
    world.step(1 / 60, delta, 10);
    objectList.current.forEach(object => {
      // eslint-disable-next-line prefer-destructuring
      object.render.x = object.physics.interpolatedPosition[0];
      object.render.y = -1 * object.physics.interpolatedPosition[1];
      object.render.rotation = object.physics.interpolatedAngle;
    });
  });

  useEffect(() => {
    const emoteTexture = `${PUBLIC_URL}/sprites/emoteTexture.json`;
    loader.add(emoteTexture).load((_loader, resources) => {
      textures.current = resources[emoteTexture].textures;
      buildPhysics();
      setupTMI();
    });
  }, [loader, buildPhysics, setupTMI]);

  useEffect(() => {
    if (auto) {
      setTimeout(() => createObject(true, false), 3 * 1000);
    }
  }, [auto, createObject]);

  return (
    <ParticleContainer
      maxSize="3000"
      properties={{ scale: true, rotation: true }}
    />
  );
}

Scene.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  auto: PropTypes.bool.isRequired,
  spam: PropTypes.bool.isRequired
};

export default Scene;
