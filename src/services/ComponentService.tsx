import { executeSqlAsync } from '../modules/database'
import SqlBuilder from '../modules/SqlBuilder'
import { ComponentesTelas } from '../modules/Types'

class ComponentService {
  saveAsync = async (dados: ComponentesTelas) => {
    let sql = new SqlBuilder()

    if (dados.id > 0) {
      sql.update('Components')
      sql.addWhere('id', dados.id)
    } else {
      sql.insert('Components')
    }
    sql.addField('chave', dados.chave)
    sql.addField('valor', dados.valor)

    console.log(sql.generate())

    await executeSqlAsync(sql.generate())
  }

  getAsync = async () => {
    const result = await executeSqlAsync('SELECT * FROM Components')

    if (result.length == 0) {
      return null
    }

    var componentesTelas: Array<ComponentesTelas> = result.map(
      (x: ComponentesTelas) => {
        return {
          id: x.id,
          chave: x.chave,
          valor: x.valor,
        }
      }
    )

    return componentesTelas
  }

  deleteAsync = async (id: number) => {
    let sql = new SqlBuilder()

    sql.delete('Components')
    sql.addWhere('id', id)

    await executeSqlAsync(sql.generate())
  }
}

export default ComponentService
