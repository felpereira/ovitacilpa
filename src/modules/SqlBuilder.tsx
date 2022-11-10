interface Field {
  field: string
  value: any
}

interface Condition {
  field: string
  value: any
  operator: string
}

class SqlBuilder {
  private _fields: Field[]
  private _conditions: Condition[]
  private _method: 'insert' | 'replace' | 'update' | 'delete'
  private _tableName = ''

  constructor() {
    this._fields = []
    this._conditions = []
    this._method = 'insert'
  }

  insert = (tableName: string) => {
    this._method = 'insert'
    this._tableName = tableName
  }

  replace = (tableName: string) => {
    this._method = 'replace'
    this._tableName = tableName
  }

  update = (tableName: string) => {
    this._method = 'update'
    this._tableName = tableName
  }

  delete = (tableName: string) => {
    this._method = 'delete'
    this._tableName = tableName
  }

  addField = (field: string, value: any) => {
    this._fields.push({
      field,
      value: this.sqlValue(value),
    })
  }

  addWhere = (field: string, value: any, operator = '=') => {
    this._conditions.push({
      field,
      value: this.sqlValue(value),
      operator,
    })
  }

  generate = () => {
    switch (this._method) {
      case 'insert':
        return this.generateInsert()
      case 'replace':
        return this.generateReplace()
      case 'update':
        return this.generateUpdate()
      case 'delete':
        return this.generateDelete()
    }
  }

  private generateInsert = () => {
    const fields = this._fields.map(x => x.field).join(', ')
    const values = this._fields.map(x => x.value).join(', ')

    let query = `INSERT INTO ${this._tableName} `

    query += '('
    query += fields
    query += ')'
    query += ' VALUES '
    query += '('
    query += values
    query += ')'

    return query
  }

  private generateReplace = () => {
    const fields = this._fields.map(x => x.field).join(', ')
    const values = this._fields.map(x => x.value).join(', ')

    let query = `REPLACE INTO ${this._tableName} `

    query += '('
    query += fields
    query += ')'
    query += ' VALUES '
    query += '('
    query += values
    query += ')'

    return query
  }

  private generateUpdate = () => {
    const fieldsToUpdate = this._fields
      .map(x => x.field + ' = ' + x.value)
      .join(', ')

    let query = `UPDATE ${this._tableName} SET ${fieldsToUpdate}`

    if (this._conditions.length > 0) {
      query += this.generateWhere()
    }

    return query
  }

  private generateDelete = () => {
    let query = `DELETE FROM ${this._tableName}`

    if (this._conditions.length > 0) {
      query += this.generateWhere()
    }

    return query
  }

  private generateWhere = () => {
    const conditions = this._conditions
      .map(x => `${x.field} ${x.operator} ${x.value}`)
      .join(' AND ')

    return ` WHERE ${conditions}`
  }

  private sqlValue = (value: any) => {
    if (typeof value === 'string') {
      value = value ? `'${value.replace("'", "''")}'` : 'null'
    }

    if (typeof value === 'boolean') {
      value = Number(value)
    }

    if (value instanceof Date) {
      value = `'${value.toISOString()}'`
    }

    if (value == null) {
      value = 'null'
    }

    return value
  }
}

export default SqlBuilder
