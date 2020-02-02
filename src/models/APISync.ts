import Axios, { AxiosPromise } from "axios";
import { ISync } from "./Model";

interface HasId {
  id?: number;
}

export class APISync<T extends HasId> implements ISync<T> {
  constructor(public rootUrl: string) {}
  fetch(id: number): AxiosPromise {
    return Axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      //put
      return Axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      //post
      return Axios.post(`${this.rootUrl}`, data);
    }
  }
}
