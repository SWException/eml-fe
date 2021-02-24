# Front-end dockerized

### Come usare il front-end tramite docker

*Per poter usare il front-end è necessario avere installato docker e docker compose nel proprio computer*

Per gli utenti Windows sarà sufficiente installare docker desktop

Per gli utenti Linux o simili sarà necessario installare sia docker sia docker-compose

Inoltre per poter eseguire eml-fe in hot-reload sarà necessario inserire in Settings/Resources/Filesharing la directory dove è presente la cartella eml-fe

## Lista di comandi importanti

La maggior parte dei comandi va eseguita nella directory che contiene il file **docker-compose.yaml**

| Descrizione   							| Comando 		|
| ------------- 							|:-------------:|
| Esecuzione (Build solo se non presente)	| **docker-compose up -d**	|
| Esecuzione e Build forzata				| **docker-compose up -d --build**	|
| Build      								| **docker-compose build**	|
| Interruzzione del container				| **docker-compose down**	|
