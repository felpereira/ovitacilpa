const migrationV1 = () => {
  const Telas = `
  create table if not exists Telas (
    id INTEGER PRIMARY KEY,
    nome TEXT, 
    ordenacao INTEGER,
    icone TEXT    
  );`

  const Components = `
    create table if not exists Components (
      id INTEGER PRIMARY KEY,
      chave	TEXT,
      valor TEXT,
      tipo INTEGER,
      tela INTEGER,
      ordenacao INTEGER      
    );`

  const InserTelas = `    
      INSERT INTO Telas (nome, ordenacao, icone) VALUES ('1', 0, 'Home');`

  return [Telas, Components, InserTelas]
}

const migrationV2 = () => {
  const Configuracoes = `
    create table if not exists Configuracoes (      
      chave	TEXT PRIMARY KEY,
      valor TEXT
    );`

  return [Configuracoes]
}

export const getMigrations = () => {
  return [
    { version: 1, scripts: migrationV1() },
    { version: 2, scripts: migrationV2() },
  ]
}
