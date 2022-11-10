import { executeSqlAsync } from '../modules/database'
import SqlBuilder from '../modules/SqlBuilder'
import { Telas } from '../modules/Types'

class TelasServices {
  saveAsync = async (dados: Telas) => {
    let sql = new SqlBuilder()

    if (dados.id > 0) {
      sql.update('Telas')
      sql.addWhere('id', dados.id)
    } else {
      sql.insert('Telas')
    }
    sql.addField('nome', dados.nome)
    sql.addField('ordenacao', dados.ordenacao)
    sql.addField('icone', dados.icone)

    console.log(sql.generate())

    await executeSqlAsync(sql.generate())
  }

  getAsync = async () => {
    const result = await executeSqlAsync('SELECT * FROM Telas')

    if (result.length == 0) {
      return null
    }

    var Telas: Array<Telas> = result.map((x: Telas) => {
      return {
        id: x.id,
        nome: x.nome,
        ordenacao: x.ordenacao,
        icone: x.icone,
      }
    })

    return Telas
  }

  deleteAsync = async (id: number) => {
    let sql = new SqlBuilder()

    sql.delete('Telas')
    sql.addWhere('id', id)

    await executeSqlAsync(sql.generate())
  }
}

export default TelasServices
