import type {PlayerAction} from "@/types/actions.ts";

export const CARD_SCALE_SMALL = 0.6;
export const CARD_SCALE_LARGE = 1.1;

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA07rmFYxIPgf5ZicE6tLnT0g7otsntVAI",
  authDomain: "blackjack-19729.firebaseapp.com",
  projectId: "blackjack-19729",
  storageBucket: "blackjack-19729.firebasestorage.app",
  messagingSenderId: "695301861998",
  appId: "1:695301861998:web:158fd8368aaac069c52c7f",
  measurementId: "G-BNTT6670HE"
};

export const LOCAL_KEY_EMAIL = 'User_Email';
export const GAME_CONFIG_STORAGE_KEY = 'bjk_game_config'
export const STRATEGY_STORAGE_KEY = 'selectedStrategyId'
export const SETTINGS_STORAGE_KEY = 'bjk_settings'

export const ACTION_COLORS: Record<PlayerAction, { label: string; color: string, text: string }> = {
  Hit: {label: 'H', color: '#f5f5f5', text: '#111'},
  Stand: {label: 'S', color: '#fde047', text: '#111'},
  Double: {label: 'D', color: '#f472b6', text: '#111'},
  Split: {label: 'Y', color: '#38bdf8', text: '#111'},
  Surrender: {label: 'R', color: '#f97316', text: '#111'},
  Insurance: {label: 'I', color: '#000000', text: '#eee'},
  DeclineInsurance: {label: 'X', color: '#6b7280', text: '#111'}
}
