<template>
  <div>
    <div>Turn: {{this.turn}}</div>
    Share:
    <a :href="whatsAppLink">
      <WhatsAppLogo />
    </a>
    <a :href="messengerLink">
      <MessengerLogo />
    </a>
    <div>Game id: {{this.gameId}}</div>
    <ChessBoard />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChessBoard from '@/components/ChessBoard.vue';
import WhatsAppLogo from '@/assets/whatsapp.svg';
import MessengerLogo from '@/assets/messenger.svg';

export default {
  name: 'current-game',
  components: {
    ChessBoard,
    WhatsAppLogo,
    MessengerLogo,
  },
  data() {
    return {
      gameId: this.$route.params.gameId,
      whatsAppLink: `whatsapp://send?text=${window.location.href}`,
      messengerLink: `fb-messenger://share/?link=${window.location.href}&app_id=123456789`,
    };
  },
  mounted() {
    console.log(window.location);
  },
  computed: {
    ...mapGetters(['turn']),
  },
};
</script>
