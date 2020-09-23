function is_terminal(board) {
    ++helper_eval_state_count; //DO NOT REMOVE
    
    /*************************
    * TASK: Implement the terminal test
    * Return true if the game is finished (i.e, a draw or someone has won)
    * Return false if the game is incomplete
    *************************/
    
    // Checking base case if the board is full and game is a tie
    let isFull = true;
    for(i = 0 ; i < 9; i++){
      if(board[i] == -1){
        isFull = false;
      }
    }
    if(isFull){
      return true;
    }

    //Check the other 9 states that are wins

    for(j =0; j <= 6; j++){
      if(board[j] != -1){
        if(j == 0 || j == 3 || j == 6){
          let a = j;
          let b = j +1;
          let c = j+2;
          if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
            return true;
          }
        }
        if(j == 0 || j == 1 || j == 2){
          let a = j;
          let b = j +3;
          let c = j+6;
          if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
            return true;
          }
        }
        if(j == 0){
          let a = j;
          let b = j +4;
          let c = j+8;
          if(board[a] == board[b] && board[b] == board[c] && board[a]== board[c]){
            return true;
          }
        }
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