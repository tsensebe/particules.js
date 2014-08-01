# PARTICULES JS
Emit or attract particules from a point.

## API 
> // center coordinate and canvas name
> var example = particules(x,y, canvas);
   
> // particule radius from center (default:100)
> example.radius(75);

> // particule speed (pixel/sec) (default:10)
> example.speed(5);

> // Rotation speed (pixel/sec) (default:Math.PI/4)
> example.rotation(-Math.PI/8);

> // New particules/second (default:10)
> example.growRate(60);

> // Start simulation
> example.start();

> // Stop simulation
> example.stop();
