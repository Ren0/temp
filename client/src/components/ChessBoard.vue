<template>
  <div class="center">
    <div id="board" style="width:2px"></div>
  </div>
</template>

<script>
import ChessBoard from 'chessboardjs';
import './chessboard-1.0.0.css';
import Chess from 'chess.js';

export default {
  name: 'chessboard-game',
  data() {
    return {
      gameId: this.$route.params.gameId,
      board: null,
      game: new Chess(),
    };
  },
  mounted() {
    const config = {
      draggable: true,
      position: 'start',
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd,
    };
    this.board = new ChessBoard('board', config);
  },
  created() {
    if (this.$store.state.socket.isConnected) {
      this.$store.dispatch('fetchGame', this.gameId);
    }
    this.$store.watch(
      state => state.socket.isConnected,
      (newValue, oldValue) => {
        if (!oldValue && newValue) {
          this.$store.dispatch('fetchGame', this.gameId);
        }
      },
    );

    this.$store.watch(
      state => state.game.fen,
      (newFen, oldFen) => {
        this.board.orientation(this.white === localStorage.getItem('playerId') ? 'white' : 'black');
        if (newFen !== oldFen) {
          this.board.position(newFen);
          this.game = new Chess(newFen);
        }
      },
    );
  },
  computed: {
    fen() {
      return this.$store.getters.fen;
    },
    turn() {
      return this.$store.getters.turn;
    },
    chess() {
      return this.$store.getters.chess;
    },
    white() {
      console.log(this.$store.getters.white);
      return this.$store.getters.white;
    },
    black() {
      console.log(this.$store.getters.black);
      return this.$store.getters.black;
    },
  },
  methods: {
    //   const ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';
    onDragStart(source, piece, position, orientation) {
      console.log('onDragStart', source, piece, position, orientation);
      if (this.game.game_over()) return false;
      // if (piece.search(/^b/) !== -1) return false;
      return '';
    },
    onDrop(from, to) {
      const move = this.game.move({
        from,
        to,
        promotion: 'q',
      });

      if (move === null) return 'snapback';

      this.$store.dispatch('move', to);
      return '';
    },
    onSnapEnd(a, b) {
      console.log('onSnapEnd', a, b);
      this.board.position(this.fen);
    },
  },
};
</script>

<style scoped lang="scss">
.center {
  margin: auto;
  width: 95%;
  border: .1em solid black;
}
</style>
