# CSE3521_HW4
Authors: Lauren Saggar and Michael Seidle

1 c) The game does play as I would expect. The CPU player uses the move expand order specified by an array where it chooses the next consecutive available spot numbered 0-8 for each of its turns based on the minimax algorithm. Since this is no an optimal ordering, I can beat it. As expected, it is easier to beat the CPU player when I go first. 

CPU move #1: (Evaluated 59705 states, Expanded 31973 states)

CPU move #2: (Evaluated 1055 states, Expanded 582 states)

CPU move #3: (Evaluated 27 states, Expanded 12 states)

Over the course of the game, the number of states evaluated decreases. This is to be expected, as every time that the CPU player takes a turn, the minimax algorithm is evaluated at a depth two lower than it's previous evaluation. This makes sense, as there are always going to be less available paths to a terminal state as the minimax algorithm is applied lower in the state tree.  

e)

The game does play I as expect. The expanded shrinks by a good amount from standard minimax. Also good moves are made to prevent the human from winning. Not always the best best move but for easy choices to prevent wins it works as expected. 

CPU move #1: (Evaluated 55505 states, Expanded 29633 states)
CPU move #2: (Evaluated 959 states, Expanded 510 states)
CPU move #3: (Evaluated 35 states, Expanded 17 states)
CPU move #4: (Evaluated 4 states, Expanded 2 states)


f) 
    Nodes expanded with Minimax: 294778 states

    Nodes expanded with Minimax + Alpha-Beta Pruning: 31974 states

How do the two algorithms compare?
The number of expanded states dramatically decreased with alpha-beta pruning as expected. This is because alpha-beta pruning allows us to eliminate branches of the search tree that cannot possibly affect the final minimax decision without checking their states to improve searching efficiency. 


Results with new move_expand_order:

    Nodes expanded with Minimax: expanded 294778 states

    Nodes expanded with Minimax + Alpha-Beta Pruning: expanded 29634 states

How do the results change? Why do you get this result?
The number of states expanded for alpha-beta pruning decreased with the new move_expand_order configuration as expected, as those states that are more likely to give a desired result are checked first when expanding new states. This in turn improves searching efficiency.
