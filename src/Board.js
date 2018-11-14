// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // hasRowConflictAt: function(rowIndex) {
    //   let row = this.get(rowIndex);
    //   let foundFirst = false;
    //   let hasConflict = false;
    //   for (let i = 0; i < row.length; i ++) {
    //     if ((row[i] === 1) && (foundFirst)) {
    //       hasConflict = true;
    //     }

    //     if ((row[i] === 1) && (!foundFirst)) {
    //       foundFirst = true;
    //     }

        

    //   }
    //   return hasConflict; // fixme
    // },

    hasRowConflictAt: function(rowIndex) {
      let row = this.get(rowIndex);
      let count = 0;

      for (let i = 0; i<row.length; i++) {
        count += row[i];
      }
      return (count>1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let n = this.get("n");
      for (let i = 0; i < n; i++) {
        if(this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let n = this.get("n");
      let column = [];
      for (let i = 0; i<n; i++) {
        column.push(this.get(i)[colIndex])
      }
      let count = 0;
      for (let i = 0; i<column.length; i++) {
        count += column[i];
      }
      return (count>1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let n = this.get("n");
      for (let i = 0; i < n; i++) {
        if(this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let n = this.get("n");
      let major_diagonal = [];
      let col_index = majorDiagonalColumnIndexAtFirstRow
      
      for (let row_index = 0; row_index<n; row_index++) {
        if(this._isInBounds(row_index, col_index)) {
          major_diagonal.push(this.get(row_index)[col_index])
        }
        col_index++;
      }
      let count = 0;
      for (let i = 0; i<major_diagonal.length; i++) {
        count += major_diagonal[i];
      }
      return (count>1)
    },

    // hasColConflictAt: function(colIndex) {
    //   let n = this.get("n");
    //   let column = [];
    //   for (let i = 0; i<n; i++) {
    //     column.push(this.get(i)[colIndex])
    //   }
    //   let count = 0;
    //   for (let i = 0; i<column.length; i++) {
    //     count += column[i];
    //   }
    //   return (count>1);
    // },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let n = this.get("n");
      for (let i = 1-n; i < n; i++) {
        if(this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    //   let n = this.get("n");
    //   let major_diagonal = [];
    //   let col_index = majorDiagonalColumnIndexAtFirstRow
      
    //   for (let row_index = 0; row_index<n; row_index++) {
    //     if(this._isInBounds(row_index, col_index)) {
    //       major_diagonal.push(this.get(row_index)[col_index])
    //     }
    //     col_index++;
    //   }
    //   let count = 0;
    //   for (let i = 0; i<major_diagonal.length; i++) {
    //     count += major_diagonal[i];
    //   }
    //   return (count>1)
    // },
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let n = this.get("n");
      let minor_diagonal = [];
      let col_index = minorDiagonalColumnIndexAtFirstRow
      
      for (let row_index = 0; row_index < n; row_index++) {
        if(this._isInBounds(row_index, col_index)) {
          minor_diagonal.push(this.get(row_index)[col_index])
        }
        col_index--;
      }
      let count = 0;
      for (let i = 0; i < minor_diagonal.length; i++) {
        count += minor_diagonal[i];
      }
      return (count>1)
    },

    // hasAnyMajorDiagonalConflicts: function() {
    //   let n = this.get("n");
    //   for (let i = 1-n; i < n; i++) {
    //     if(this.hasMajorDiagonalConflictAt(i)) {
    //       return true;
    //     }
    //   }
    //   return false;
    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let n = this.get("n")
      for (let i =2*n; i>0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
