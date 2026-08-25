# Tech Defects Manager

Frontendový prototyp pre správu technických nedostatkov a investičných požiadaviek.


## Quick start
- npm i
- npm run dev

## Cieľ
- prehliadanie technických nedostatkov
- filtrovanie a vyhľadávanie
- detail nedostatku
- vytváranie investičných žiadostí

## Stav projektu
- hlavná obrazovka technických nedostatkov je funkčná
- filtračné nástroje sú hlavný fokus implementácie
- niektoré obrazovky a flows sú ešte prototypové / nedokončené

## Architektúra a stack
- React + TypeScript + Vite
- Zustand pre state management
- React Router pre navigáciu
- Leaflet + react-leaflet pre mapové zobrazenie
- CSS Modules + Tailwind pre UI
- mock API vrstva v public/mocks a zzz_api

## Struktúra
Aplikácia je navrhnutá ako plochá feature-based štruktúra: jednotlivé domény sú rozložené do samostatných feature-folders, bez hlbokých vrstiev a bez centralizovaného "modules" typu. Každý feature folder obsahuje svoje vlastné logické časti priamo vedľa seba.

- app/ – globálna aplikácia, header, entry point a globálne štýly
- app_router/ – routing a definícia ciest
- defects/ – hlavná doména technických nedostatkov
  - _stores/ – Zustand store pre data
  - _hooks/ – logika filtrov, výpočtov a helper hooky
  - _utils/ – utilitné funkcie pre filtrovanie a transformácie
  - filterControlBar/ – UI a logika pre filter bar
  - filterControlSideBar/ – bočný panel filtrov
  - formInvestmentRequest_modal/ – modal pre vytvorenie investičnej požiadavky
  - defects/ – komponenty zoznamu nedostatkov
  - displayControlBar/ – toolbar pre prepínanie zobrazenia
  - severityLevelCircle/ – UI reprezentácia závažnosti
- defectDetail/ – detail technického nedostatku
- investmentRequests/ – doména investičných požiadaviek a ich store
- app_shared/ – zdieľané layout, wrappery, buttony, inputy a visuelné základné komponenty
- zzz_api/ – API/mock adapter vrstva
- zzz_react/ – spoločné React helper utilitky
- zzz_reactLeaflet/ – mapová integrácia a Leaflet wrappery

### Architektonický princíp
- flat feature structure, bez hlbokých nested vrstiev
- feature folder obsahuje svoje data, hooky, utilitky a UI priamo v jednom kontexte
- inicializačná vrstva načítava dáta do Zustand store
- komponenty čítajú zo store a nepoužívajú lokálny duplicovaný state tam, kde to nie je potrebné
- mock backend je aktuálne náhradou za API


