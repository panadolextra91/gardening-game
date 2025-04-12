# Game Mechanics Overview

## User Accounts and Economy
- **Account Options:**  
  Players can create a full account using email/password, log in through social providers (Google or Facebook), or choose to play in guest mode. Guest mode allows players to try the game, but progress is not saved permanently.
  
- **Starting Coins:**  
  Every player starts with 500 coins. These coins are used to purchase pots, plants, and care items throughout the game.

- **Inventory System:**  
  Players have an inventory that tracks items such as Fertilizer, Water, and Sunlight.  
  - **Fertilizer:** Speeds up plant growth by reducing the waiting time for the next growth stage by 15 minutes each time it’s applied.
  - **Water:** Must be applied at regular intervals unique to each plant type (for example, a rose every 10 hours, a violet every 11 hours). If not watered on time, the plant will eventually die.
  - **Sunlight:** Each plant type requires a specific total amount of sunlight (e.g., a rose needs 1 hour in total, while a violet might need 30 minutes). However, exposure beyond a safe limit can cause the plant to burn and die.

## Garden and Pot Placement
- **Personal Garden:**  
  Every user has a personal garden where the gameplay unfolds. The garden is organized as a grid of valid locations where pots can be placed.

- **Ghost Pot Indicator:**  
  When the player hovers the mouse over a valid location in the grid, a “ghost” pot (an outlined, dashed pot shape) appears, indicating that the spot is available.

- **Selecting and Placing Pots:**  
  Clicking on a ghost pot opens a modal where the player can choose from various pot types, each with its own image and price. Once a pot type is selected and the cost is deducted from the player’s coins, a “real” pot is placed at that grid location.  
  - Each garden location is unique, ensuring that only one pot can occupy any given cell.

## Planting, Growth, and Harvesting
- **Plant Selection and Placement:**  
  After placing a pot, players can click the pot to open a modal that displays available plant types. These are shown with their images, prices, and details about care requirements (water and sunlight needs, potential problems, etc.).

- **Plant Growth Lifecycle:**  
  - **Planting:** When a plant is chosen, a seed is planted in the pot.  
  - **Growth Stages:** The plant starts as a seed and progresses through stages (sprout, young, and adult) over time. Each stage transition is based on a preset growth duration, which may be accelerated if the player applies fertilizer.
  - **Tracking Growth:** The game schedules when a plant will advance to the next stage, using a timestamp to determine when the change should occur.

- **Plant Care and Maintenance:**  
  - **Watering:** Each plant type has a specified watering interval. The game records the last and next watering times for each plant. If not watered in time, the plant risks dying from dehydration.
  - **Sunlight Exposure:** Plants accumulate sunlight over their lifespan. Each plant has a required total sunlight duration and a maximum safe limit. Insufficient sunlight prevents healthy growth, while too much sunlight can burn the plant, resulting in death.
  - **Fertilizer:** Players can use fertilizer from their inventory to reduce the time it takes for a plant to reach its next growth stage.

- **Harvesting and Selling:**  
  Once a plant reaches the adult stage, players can harvest it. Harvesting sells the plant for coins based on its type and may be influenced by the quality of the pot it was grown in. Each harvest is recorded, providing a history of a player’s successes and earnings.

## Summary of Gameplay Loop
1. **Sign In/Play as Guest:** Players log in or play as guests and receive 500 coins.
2. **Build Your Garden:** Players are presented with a grid-based garden where they can place pots by selecting valid locations.
3. **Choose a Pot:** Hovering over a spot shows a “ghost pot”. Clicking opens a modal to choose a pot type, which deducts coins and places a real pot.
4. **Planting:** Clicking on a placed pot brings up plant options. Once a plant is chosen, a seed is planted.
5. **Growth and Care:** Plants grow over time, transitioning through several stages. Players must water the plants and manage their sunlight exposure according to each plant type’s needs. Fertilizer can be applied to accelerate growth.
6. **Harvesting:** When plants reach maturity, they can be harvested for coins. The sale price is influenced by both the plant type and the pot quality.
7. **Reinvestment:** Earnings allow players to buy additional pots, plants, or care items, fueling the cycle of growth and economy in the game.

---
