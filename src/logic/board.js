import { WINNER_COMBOS } from "../constants.js";

//Comprobar si hay un ganador
export const checkWinnerFrom = (boardToCheck) => {
  // Recorremos todas las combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {
    // Destructuramos las posiciones de la combinacion
    const [a, b, c] = combo;
    if (
      // Comprobamos primero que la primera posicion no este vacia
      boardToCheck[a] &&
      // Y segundo que las tres posiciones sean iguales
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      // Si eso es correcto devolvemos el ganador que sera el mismo que en la posicion a
      return boardToCheck[a];
    }
  }
  // En caso de no haber ganador hay empate
  return null;
};
