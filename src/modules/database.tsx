import * as SQLite from 'expo-sqlite'
import { getMigrations } from './migrations'

const database = SQLite.openDatabase('meuApp.db')

export function executeSqlAsync(sql: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(sql, [], (_, { rows }) => {
          resolve(rows._array)
        })
      },
      () => reject('Erro no Sql: ' + sql)
    )
  })
}

export async function applyMigrationsAsync() {
  await executeSqlAsync(`
    CREATE TABLE IF NOT EXISTS migration
    (
      version NUMBER NOT NULL
    );
  `)

  const version = await getCurrentDbVersionAsync()

  const migrationsToRun = getMigrations().filter(
    x => x.version > Number(version)
  )

  for (let migration of migrationsToRun) {
    for (let script of migration.scripts) {
      await executeSqlAsync(script)
    }

    await executeSqlAsync(`UPDATE migration SET version = ${migration.version}`)
  }
}

async function getCurrentDbVersionAsync(): Promise<Number> {
  const result = await executeSqlAsync('SELECT version FROM migration')

  if (result.length > 0) {
    return Number(result[0].version)
  } else {
    await executeSqlAsync(`INSERT INTO migration (version) VALUES (0)`)

    return 0
  }
}
