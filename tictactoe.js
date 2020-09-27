//Define the order in which to examine/expand possible moves
//(This affects alpha-beta pruning performance)
// let move_expand_order=[0,1,2,3,4,5,6,7,8]; //Naive (linear) ordering
let move_expand_order=[4,0,1,2,3,5,6,7,8]; //Better ordering?
//let move_expand_order=[4,0,2,6,8,1,3,5,7]

/***********************************************************
  * board: game state, an array representing a tic-tac-toe board
  * The positions correspond as follows
  * 0|1|2
  * -+-+-
  * 3|4|5 -> [ 0,1,2,3,4,5,6,7,8 ]
  * -+-+-
  * 6|7|8
  * For each board location, use the following:
  *  -1 if this space is blank
  *   0 if it is X
  *   1 if it is O
  *
  * cpu_player: Which piece is the computer designated to play
  * cur_player: Which piece is currently playing
  *   0 if it is X
  *   1 if it is O
  * So, to check if we are currently looking at the computer's
  * moves do: if(cur_player===cpu_player)
  *
  * Returns: Javascript object with 2 members:
  *   score: The best score that can be gotten from the provided game state
  *   move: The move (location on board) to get that score
  ***********************************************************/

function tictactoe_minimax(board,cpu_player,cur_player) {

  if(is_terminal(board)) //Stop if game is over
    return {
      move:null,
      score:utility(board,cpu_player) //How good was this result for us?
    }

    // Initialize max and min scores and moves
    max_score = -Infinity;
    max_move = null;
    min_score = Infinity;
    min_move = null;

  ++helper_expand_state_count; //DO NOT REMOVE
  //GENERATE SUCCESSORS//
  for(let move of move_expand_order) { //For each possible move (i.e., action)
    if(board[move]!=-1) continue; //Already taken, can't move here (i.e., successor not valid)
    
    let new_board=board.slice(0); //Copy
    new_board[move]=cur_player; //Apply move
    //Successor state: new_board

    //RECURSION
    // What will my opponent do if I make this move?
    let results=tictactoe_minimax(new_board,cpu_player,1-cur_player);

    // Current player is CPU player (maximizing player)
    if(cur_player == cpu_player){
      if (results.score > max_score){
        
        max_score = results.score;
        max_move = move;
      }
    } 
    // Current player is human player (minimizing player)
    else {
      if(results.score < min_score){
        
        min_score = results.score;
        min_move = move;
      }
    }

    //MINIMAX
    /***********************
    * TASK: Implement minimax here. (What do you do with results.move and results.score ?)
    * 
    * Hint: You will need a little code outside the loop as well, but the main work goes here.
    *
    * Hint: Should you find yourself in need of a very large number, try Infinity or -Infinity
    ***********************/

    /*
    We need to take the orginal board and generate all possible moves and from those moves
    see how many moves it would take to win 
    */
  }

  //Return results gathered from all sucessors (moves).
  //Which was the "best" move?  
  
  // Runs if current player is CPU player (maximizer)
  if(cur_player == cpu_player){
    console.log("CPU Move: "+ max_move+"CPU Score: "+max_score);
    return {
      
      move: max_move,
      score: max_score
    };
  } else { // Runs if current player is human player (minimizer)
    console.log("CRU Move: "+ min_move+"CRU Score: "+min_score);
   return {
      move: min_move,
      score: min_score
    };
  }
}

function is_terminal(board) {
  ++helper_eval_state_count; //DO NOT REMOVE
  
  /*************************
  * TASK: Implement the terminal test
  * Return true if the game is finished (i.e, a draw or someone has won)
  * Return false if the game is incomplete
  *************************/
  
  // Checking base case if the board is full and game is a tie
  let isFull = true;
  let count = 0;
  while (isFull && count < 9) {
    if(board[count] == -1){
      isFull = false;
    } else {
      count++;
    }
  }
  
  if(isFull) {
    return true;
  }

  //Check the other 9 states that are wins

  for(var j = 0; j <= 6; j++){
    
    if(board[j] != -1){

      // Searches for row winning state
      if(j == 0 || j == 3 || j == 6){
        let a = j;
        let b = j +1;
        let c = j+2;
        if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
          return true;
        }
      }

      // Searches for column winning state
      if(j == 0 || j == 1 || j == 2){
        let a = j;
        let b = j +3;
        let c = j+6;
        if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
          return true;
        }
      }

      // Searches for top left to bottom right diagonal winning state
      if(j == 0){
        let a = j;
        let b = j +4;
        let c = j+8;
        if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
          return true;
        }
      }

      // Searches for top right to bottom left diagonal winning state
      if(j == 2){
        let a = j;
        let b = j +2;
        let c = j+4;
        if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
          return true;
        }
      }
    }

  }

  return false;
}

function utility(board,player) {
  /***********************
  * TASK: Implement the utility function
  *
  * Return the utility score for a given board, with respect to the indicated player
  *
  * Give score of 0 if the board is a draw
  * Give a positive score for wins, negative for losses.
  * Give larger scores for winning quickly or losing slowly
  * For example:
  *   Give a large, positive score if the player had a fast win (i.e., 5 if it only took 5 moves to win)
  *   Give a small, positive score if the player had a slow win (i.e., 1 if it took all 9 moves to win)
  *   Give a small, negative score if the player had a slow loss (i.e., -1 if it took all 9 moves to lose)
  *   Give a large, negative score if the player had a fast loss (i.e., -5 if it only took 5 moves to lose)
  * (DO NOT simply hard code the above 4 values, other scores are possible. Calculate the score based on the above pattern.)
  * (You may return either 0 or null if the game isn't finished, but this function should never be called in that case anyways.)
  *
  * Hint: You can find the number of turns by counting the number of non-blank spaces
  *       (Or the number of turns remaining by counting blank spaces.)
  ***********************/

  var numBlankSpaces = 0;
  for (var i = 0; i < 9; i++) {
    if (board[i] == -1) {
      numBlankSpaces++;
    }
  }

  let a = -1;
  let b = -1;
  let c = -1;
  let j = 0;
  setFound = false;

  while (setFound == false && j <= 6) {
    
    if(board[j] != -1){

      // Searches for row winning state
      if(j == 0 || j == 3 || j == 6){
        a = j;
        b = j +1;
        c = j+2;
        if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
          setFound = true;
        }
      }

      // Searches for column winning state
      if(j == 0 || j == 1 || j == 2){
        a = j;
        b = j +3;
        c = j+6;
        if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
          setFound = true;
        }
      }

      // Searches for top left to bottom right diagonal winning state
      if(j == 0){
        a = j;
        b = j +4;
        c = j+8;
        if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
          setFound = true;
        }
      }

      // Searches for top right to bottom left diagonal winning state
      if(j == 2){
        a = j;
        b = j +2;
        c = j+4;
        if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
          setFound = true;
        }
      }
    }
    j++;
  }

  let score = 0;
  let num_moves = 9 - numBlankSpaces;
  
  // Assigns highest score for winning with the least number of moves and the lowest score
  // for losing with the least number of moves
  if (setFound) {
    if (board[a] == player) {
       score = 10 - num_moves;
    } else {
      score = num_moves - 10;
    }
  } 
  return score;
}

function tictactoe_minimax_alphabeta(board,cpu_player,cur_player,alpha,beta) {
  /***********************
  * TASK: Implement Alpha-Beta Pruning
  *
  * Once you are confident in your minimax implementation, copy it here
  * and add alpha-beta pruning. (What do you do with the new alpha and beta parameters/variables?)
  *
  * Hint: Make sure you update the recursive function call to call this function!
  ***********************/
  if(is_terminal(board)) //Stop if game is over
  return {
    move:null,
    score:utility(board,cpu_player) //How good was this result for us?
  }

 // Initialize max and min scores and moves
  max_score = -Infinity;
  max_move = null;
  min_score = Infinity;
  min_move = null;

++helper_expand_state_count; //DO NOT REMOVE
//GENERATE SUCCESSORS//
for(let move of move_expand_order) { //For each possible move (i.e., action)
  if(board[move]!=-1) continue; //Already taken, can't move here (i.e., successor not valid)

  let new_board=board.slice(0); //Copy
  new_board[move]=cur_player; //Apply move
  //Successor state: new_board

  //RECURSION
  // What will my opponent do if I make this move?
  let results=tictactoe_minimax(new_board,cpu_player,1-cur_player, alpha, beta);

 // Finds next best move for CPU player
  if(cur_player == cpu_player){
    if (results.score > max_score){

      max_score = results.score; // if new "best" (highest) possible move for CPU player (MAX)
      max_move = move;

    }
    if (max_score > alpha) {
    alpha = max_score; 
    }

    // Runs if guaranteed value for other player is "better" than all possible options 
    // on current path
    if (beta <= alpha) {
      break;
    }

  } 
  else {
    if(results.score < min_score){
      
      min_score = results.score;
      min_move = move; // if new "best" (lowest) possible move for human player (MIN)
    }

    if (min_score < beta) {
    beta = min_score;
    }
    // Runs if guaranteed value for other player is "better" than all possible options 
    // on current path
    if (beta <= alpha) {
      break;
    }
   
  }



 //MINIMAX
 /***********************
 * TASK: Implement minimax here. (What do you do with results.move and results.score ?)
 * 
 * Hint: You will need a little code outside the loop as well, but the main work goes here.
 *
 * Hint: Should you find yourself in need of a very large number, try Infinity or -Infinity
 ***********************/

 /*
 We need to take the orginal board and generate all possible moves and from those moves
 see how many moves it would take to win 
 */
}
  if(cur_player == cpu_player){
    console.log("CPU Move: "+ max_move+"CPU Score: "+max_score);
    return {
      move: max_move,
      score: max_score
    };
  } 
  else { // if current player is human player
    console.log("CRU Move: "+ min_move+"CRU Score: "+min_score);
    return {
      move: min_move,
      score: min_score
    };
  }
}

function debug(board,human_player) {
  /***********************
  * This function is run whenever you click the "Run debug function" button.
  *
  * You may use this function to run any code you need for debugging.
  * The current "initial board" and "human player" settings are passed as arguments.
  *
  * (For the purposes of grading, this function will be ignored.)
  ***********************/
  helper_log_write("Testing board:");
  helper_log_board(board);
  
  let tm=is_terminal(board);
  helper_log_write("is_terminal() returns "+(tm?"true":"false"));

  let u=utility(board,human_player);
  helper_log_write("utility() returns "+u+" (w.r.t. human player selection)");
}
