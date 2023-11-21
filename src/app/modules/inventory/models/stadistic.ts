import { StadisticByExistance } from "./stadistic-by-existance";

export interface Stadistic {
  seasonStart:Date;
  seasonEnd:Date;
  items:StadisticByExistance[];
}
