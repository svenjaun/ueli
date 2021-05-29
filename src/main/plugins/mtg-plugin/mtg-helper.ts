import * as request from "request-promise-native";
import * as icons from "../../../common/icon/default-icons";
import { Icon } from "../../../common/icon/icon";

export interface Card {
  id: number,
  name: string,
  manaCost: string,
  type: string,
  setName: string,
  colors: string[],
  text: string
};

export async function getCardSuggestions(userInput: string, maxSearchResultPerPage: number): Promise<Card[]> {
  let ready: Promise<Card[]>;
  let cards: Card[] = [];
  ready = new Promise((resolve) => {
    (async () => {
      const uri = `https://api.magicthegathering.io/v1/cards?name=${userInput}&pageSize=${maxSearchResultPerPage}`;
      const result = JSON.parse(await request.get({uri}));
      for (let jsonCard of result.cards) {
        let card: Card = {
          id: jsonCard.multiverseid,
          name: jsonCard.name,
          manaCost: jsonCard.manaCost,
          type: jsonCard.type,
          setName: jsonCard.setName,
          colors: jsonCard.colorIdentity,
          text: jsonCard.text
        }
        cards.push(card)
      }
      resolve(cards)
    })()
  })
  return await ready;
}

// TODO: Better Solution?
export function getIconType(manaCost: string, colorIdentity: string[]): Icon {
  if (manaCost) {
    let colorArray = manaCost.replaceAll("}", ",").replaceAll("{", "").split(",").splice(-1, 1)
    let lastColor = colorArray[colorArray.length - 1];
    if (lastColor.indexOf("/") !== -1) {
      switch (lastColor) {
        case "BG":
        case "GB": {
          return icons.mtgIconBG;
        }
        case "BR":
        case "RB": {
          return icons.mtgIconBR;
        }
        case "GU":
        case "UG": {
          return icons.mtgIconGU;
        }
        case "GW":
        case "WG": {
          return icons.mtgIconGW;
        }
        case "RW":
        case "WR": {
          return icons.mtgIconRW;
        }
        case "UB":
        case "BU": {
          return icons.mtgIconUB;
        }
        case "UR":
        case "RU": {
          return icons.mtgIconUR;
        }
        case "WB":
        case "BW": {
          return icons.mtgIconWB;
        }
        case "WU":
        case "UW": {
          return icons.mtgIconWU;
        }
        default: {
          return icons.mtgIcon0;
        }
      }
    }
  }

  if (colorIdentity) {
    switch (colorIdentity[colorIdentity.length - 1]) {
      case "G": {
        return icons.mtgIconG;
      }
      case "B": {
        return icons.mtgIconB;
      }
      case "R": {
        return icons.mtgIconR;
      }
      case "W": {
        return icons.mtgIconW;
      }
      case "U": {
        return icons.mtgIconU;
      }
      default: {
        return icons.mtgIcon0;
      }
    }
  }
  return icons.mtgIcon0;
}