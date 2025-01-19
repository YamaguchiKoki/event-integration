import { DIContainer } from "./container/container";
import { Dependencies } from "./container/types";

export type Variables = {
  container: DIContainer<Dependencies>;
}

export type AppType = {
  Variables: Variables;
}
