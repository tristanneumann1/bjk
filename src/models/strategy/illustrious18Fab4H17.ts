import {basicStrategyH17} from "@/models/strategy/basicStrategyH17";
import {isScenarioKey, type StrategyGrid} from "@/types/strategies";

let illustrious18Fab4H17: StrategyGrid = {
  ...basicStrategyH17,
  id: 'illustrious18Fab4H17',
  name: 'Illustrious 18 - Fab4 - H17',
}

// Illustrious 18
illustrious18Fab4H17 = {
  ...illustrious18Fab4H17,
  '9_2': [{isSoft: true, action: 'Stand'}, {trueCountGreaterEqualTo: 1, canDouble: true, action: 'Double'}, {action: 'Hit'}],
  '9_7': [{isSoft: true, action: 'Stand'}, {trueCountGreaterEqualTo: 3, canDouble: true, action: 'Double'}, {action: 'Hit'}],

  '10_10': [{isSoft: true, action: 'Stand'}, {trueCountGreaterEqualTo: 4, canDouble: true, action: 'Double'}, {action: 'Hit'}],
  '10_1': [{isSoft: true, action: 'Stand'}, {trueCountGreaterEqualTo: 4, canDouble: true, action: 'Double'}, {action: 'Hit'}],
  '11_1': [{trueCountGreaterEqualTo: 1, canDouble: true, action: 'Double'}, {action: 'Hit'}],

  '10_5': [{isSoft: true, action: 'Stand'}, {canSplit: true, trueCountGreaterEqualTo: 5, action: 'Split'}, {canDouble: true, action: 'Double'}, {action: 'Hit'}],
  '10_6': [{isSoft: true, action: 'Stand'}, {canSplit: true, trueCountGreaterEqualTo: 4, action: 'Split'}, {canDouble: true, action: 'Double'}, {action: 'Hit'}],

  '12_2': [{canSplit: true, DAS: true, action: 'Split'}, { trueCountGreaterEqualTo: 3, action: 'Stand' }, {action: 'Hit'}],
  '12_3': [{canSplit: true, action: 'Split'}, { trueCountGreaterEqualTo: 2, action: 'Stand' }, {action: 'Hit'}],
  '12_4': [{canSplit: true, action: 'Split'}, { trueCountGreaterEqualTo: 0, action: 'Stand' }, {action: 'Hit'}],
  '12_5': [{canSplit: true, action: 'Split'}, { trueCountGreaterEqualTo: -1, action: 'Stand' }, {action: 'Hit'}],
  '12_6': [{canSplit: true, action: 'Split'}, { trueCountGreaterEqualTo: -2, action: 'Stand' }, {action: 'Hit'}],

  '13_2': [{ trueCountGreaterEqualTo: -1, action: 'Stand' }, {action: 'Hit'}],
  '13_3': [{ trueCountGreaterEqualTo: -2, action: 'Stand' }, {action: 'Hit'}],

  '15_10': [{canSurrender: true, action: 'Surrender'}, { trueCountGreaterEqualTo: 4, action: 'Stand' }, {action: 'Hit'}],

  '16_9': [{canSplit: true, action: 'Split'}, {canSurrender: true, action: 'Surrender'}, { trueCountGreaterEqualTo: 5, action: 'Stand' }, {action: 'Hit'}],
  '16_10': [{canSplit: true, action: 'Split'}, {canSurrender: true, action: 'Surrender'}, { trueCountGreaterEqualTo: 0, action: 'Stand' }, {action: 'Hit'}],
}

// Fab 4
illustrious18Fab4H17 = {
  ...illustrious18Fab4H17,
  '14_10': [{canSurrender: true, trueCountGreaterEqualTo: 3, action: 'Surrender'}, {action: 'Hit'}],

  '15_9': [{canSurrender: true, trueCountGreaterEqualTo: 2, action: 'Surrender'}, {action: 'Hit'}],
  '15_10': [{canSurrender: true, trueCountGreaterEqualTo: 0, action: 'Surrender'}, { trueCountGreaterEqualTo: 4, action: 'Stand' }, {action: 'Hit'}],
  '15_1': [{canSurrender: true, trueCountGreaterEqualTo: 1, action: 'Surrender'}, {action: 'Hit'}],
}

// Insurance
for (const key in illustrious18Fab4H17) {
  const scenarioKey = key as keyof StrategyGrid
  if (!isScenarioKey(scenarioKey)) continue

  illustrious18Fab4H17[scenarioKey] = [{trueCountGreaterEqualTo: 3, canInsure: true, action: 'Insurance'}, ...illustrious18Fab4H17[scenarioKey]]
}

export { illustrious18Fab4H17 }
