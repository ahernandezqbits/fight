import { WhereFilterOp, and, where } from "firebase/firestore";
import { firebase } from "../lib/services";
interface ModelData {
  [key: string]: any
}

// Creamos la clase Model base
export default class Model<T extends ModelData> {
  private tableName: string;
  filters: any[];

  constructor(tableName: string) {
    this.tableName = tableName;
    this.filters = []
  }

  where(field: string, operator: WhereFilterOp, value: any) {
    if (value) {
      this.filters.push(and(where(field, operator, value)))
    }
    return this
  }

  async save(data: T): Promise<void> {
    try {
      await firebase.post(this.tableName, data);
    } catch (error: any) {
      throw new Error(error)
    }
  }

  // Método para actualizar un registro en la base de datos
  async update(id: string, data: Partial<T>): Promise<ModelData> {
    try {
      return await firebase.update(this.tableName, id, data);
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async delete(id: string): Promise<ModelData> {
    try {
      return await firebase.delete(this.tableName, id);
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async get(): Promise<Array<ModelData>> {
    try {
      return await firebase.get(this.tableName, this.filters);
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async first(): Promise<Array<ModelData>> {
    try {
      const data = await firebase.get(this.tableName, this.filters);
      return data[0]
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async show(id: string): Promise<ModelData> {
    try {
      return await firebase.show(this.tableName, id);
    } catch (error: any) {
      throw new Error(error)
    }
  }
}