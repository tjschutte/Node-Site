# GraphicsTownJS2017
So, again for this project I decided to play with perlin noise for terrain generation, but this time I kept stuff static.
This made for an interesting rolling hills sort of look, which I then applied a grass texture to repeatedly to give it a
natural look.  Since I had a grass hilly area, I threw out the idea of a 'Town' for my project, and decided to make a windmill
farm with some cloud blowing in the breeze.  The clouds are made from a random number of cubes stacked on top of eachother,
and a random number of clouds are generated when the page is loaded.  This helps to give the progam a little more interest
than just having a fixed number of items.  Besides the clouds, I also create some trees.  These are made of 4 cubes stack
ontop of one another, but they all belong to the same obejct.  So for the shader, I had to add a vcolor componenet to be
able to color the different parts of the tree seperately.

For specular shading I went with a fixed position light (for now) This would be like the sun is in a single location.  My
plan is for future iterations use my metal cubes to make something interesting with the sun being able to move and stuff.
