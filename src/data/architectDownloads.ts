/** Architect CAD cloud downloads - sourced from elements-show.pl/dla-architekta-2. */

export type ArchitectDownloadFile = {
  title: string;
  format: string;
  href: string;
};

export type ArchitectDownloadGroup = {
  id: string;
  label: string;
  files: readonly ArchitectDownloadFile[];
};

export const architectDownloadGroups: readonly ArchitectDownloadGroup[] = [
  {
    id: "acquabella",
    label: "Acquabella",
    files: [
      {
        title: "Wanny - pliki 3D",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/BATHTUBS.zip",
      },
      {
        title: "Panele ścienne - pliki 3D",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/PANEL.zip",
      },
      {
        title: "Brodziki pliki 3D",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/SHOWER%20TRAYS.zip",
      },
    ],
  },
  {
    id: "elements",
    label: "Elements",
    files: [
      {
        title: "XEA - wanny i umywalki - pliki CAD, model 3D, STEP",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-02/xea.zip",
      },
    ],
  },
  {
    id: "elita",
    label: "Elita",
    files: [
      {
        title: "Seria mebli łazienkowych MELLOW 60 cm, 80 cm - pliki .3ds",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/SZAFKA%20MELLOW%2080%202S_umywalka%20SOFT_uchwyt.zip",
      },
    ],
  },
  {
    id: "geberit",
    label: "Geberit",
    files: [
      {
        title: "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .obj",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA%20CAD_obj.zip",
      },
      {
        title:
          "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .sat - 1 część",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA_CAD-sat_1.zip",
      },
      {
        title:
          "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .sat - 2 część",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA_CAD-sat_2.zip",
      },
      {
        title:
          "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .sat - 3 część",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA_CAD-sat_3.zip",
      },
      {
        title: "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .stp",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA%20CAD_stp.zip",
      },
      {
        title:
          "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .igs 1 część",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA%20CAD_igs_1.zip",
      },
      {
        title:
          "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .igs 2 część",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA%20CAD_igs_2.zip",
      },
      {
        title:
          "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .dxf 1 część",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA_CAD_dxf_1.zip",
      },
      {
        title:
          "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .dxf 2 część",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA_CAD_dxf_2.zip",
      },
      {
        title:
          "Meble CALUNA - kolekcja na wyłączność - pliki CAD - .dxf 3 część",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/CALUNA%20CAD_dxf_3.zip",
      },
    ],
  },
  {
    id: "grespania",
    label: "Grespania",
    files: [
      {
        title: "Serie VALONIA - pliki JPG",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-08/Serie_VALONIA.zip",
      },
      {
        title: "Serie LUCENA - pliki JPG",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-08/Serie_LUCENA.zip",
      },
    ],
  },
  {
    id: "marmite",
    label: "Marmite",
    files: [
      {
        title: "Wanny Marmite - .dwg /.dxf /.step",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/tekstury/wanny_Marmite_.zip",
      },
    ],
  },
  {
    id: "nobili",
    label: "Nobili",
    files: [
      {
        title: "ABC",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/ABC_0.zip",
      },
      {
        title: "ACQUAVIVA",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/ACQUAVIVA_0.zip",
      },
      {
        title: "ACQUERELLI",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/ACQUERELLI_0.zip",
      },
      {
        title: "CARLOS PRIMERO",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/CARLOS%20PRIMERO.zip",
      },
      {
        title: "DRESS",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/DRESS.zip",
      },
      {
        title: "FLAG",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/FLAG.zip",
      },
      {
        title: "LIKID",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/LIKID.zip",
      },
      {
        title: "LIVE",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/LIVE.zip",
      },
      {
        title: "LOOP",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/LOOP.zip",
      },
      {
        title: "MIA",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/MIA.zip",
      },
      {
        title: "NEW ROAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/NEW_ROAD.zip",
      },
      {
        title: "RESPIRO",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/RESPIRO.zip",
      },
      {
        title: "SEVEN",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/SEVEN.zip",
      },
      {
        title: "SKY",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/SKY.zip",
      },
      {
        title: "SOFI",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/SOFI.zip",
      },
      {
        title: "SOLE",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/SOLE.zip",
      },
      {
        title: "UNO",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/UNO.zip",
      },
      {
        title: "UP",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/UP.zip",
      },
      {
        title: "VELIS",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/VELIS.zip",
      },
      {
        title: "YOYO",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-10/YOYO.zip",
      },
    ],
  },
  {
    id: "ronal",
    label: "Ronal",
    files: [
      {
        title: "Kabiny seria ETNA - pliki CAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-11/Ronal-ETNA-pliki-CAD.zip",
      },
      {
        title: "Kabiny kwadratowe i prostokątne OPHALYS - pliki CAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2026-05/OPHALYS-pliki-cad.zip",
      },
    ],
  },
  {
    id: "sanplast",
    label: "Sanplast",
    files: [
      {
        title: "Pliki CAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2024-11/sanplast.zip",
      },
    ],
  },
  {
    id: "terma",
    label: "Terma",
    files: [
      {
        title: "Grzejniki Terma dla Elements - pliki .dwg",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2021-08/Terma%20dla%20Elements.zip",
      },
    ],
  },
  {
    id: "trinnity",
    label: "Trinnity",
    files: [
      {
        title:
          "Brodziki akrylowe i kabiny TRINNITY - .obj/ .DWG /.3DS /.STEP/.STL /.IGS",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2020-01/Trinnity_0.zip",
      },
      {
        title: "Brodziki mineralne TRINNITY - pliki - 3D",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-11/pliki-3D-pod-Trinnity_0.zip",
      },
      {
        title: "Dozowniki i akcesoria obiektowe Trinnity - .DWG",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2021-09/Trinnity%20dozowniki_0.zip",
      },
      {
        title: "Grzejniki łazienkowe Trinnity - .DWG",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2021-08/Grzejniki%20%C5%82azienkowe%20TRINNITY.zip",
      },
      {
        title: "Miska wisząca - .3DS / CAD / DAE / DXF / .3D / MTL",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/TRINNITY%20MISKA%20WISZ_CA%20WC.zip",
      },
      {
        title: "Płytki - pliki CAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-07/Pliki%20CAD%20TRINNITY.zip",
      },
      {
        title: "Przyciski spłukujące Trinnity - .obj / .3DS",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2023-04/Przyciski%20splukujace%20TRINNITY.zip",
      },
      {
        title: "Poręcze uniwersalne MAT i POLER Trinnity - .STP",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-12/porecze-TRINNITY.zip",
      },
    ],
  },
  {
    id: "valvex",
    label: "Valvex",
    files: [
      {
        title: "MOTIVIO - obj. - pliki do pobrania",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-11/MOTIVO_obj.zip",
      },
      {
        title: "BATERIE MOTIVO BLACK - pliki do pobrania",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-11/BATERIE%20MOTIVO%20BLACK.zip",
      },
      {
        title: "BATERIE MOTIVO BRUSHED GOLD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-11/BATERIE%20MOTIVO%20BRUSHED%20GOLD.zip",
      },
      {
        title: "BATERIE MOTIVO BRUSHED STEEL",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-11/BATERIE%20MOTIVO%20BRUSHED%20STEEL.zip",
      },
      {
        title: "BATERIE MOTIVO CHROME",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-11/BATERIE%20MOTIVO%20CHROME.zip",
      },
      {
        title: "BATERIE MOTIVO GUN METAL",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-11/BATERIE%20MOTIVO%20GUN%20METAL.zip",
      },
    ],
  },
  {
    id: "vigour",
    label: "Vigour",
    files: [
      {
        title: "DERBY - meble - model CAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2024-02/meble_derby.zip",
      },
      {
        title: "DERBY style - armatura, ceramika, dodatki - model CAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/tekstury/DERBY_STYLE.zip",
      },
      {
        title: "VOGUE - dodatki - model CAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2023-03/model_CAD-dodatki_VOGUE.zip",
      },
      {
        title:
          "INDIVIDUAL - armatura, ceramika, dodatki - .3DS /.DWG /.max /.obj",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/tekstury/INDIVIDUAL.zip",
      },
      {
        title: "ONE - baterie model CAD",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-03/Pliki%20CAD%20VIGOUR%20kolekcja%20ONE%20BATERIE.zip",
      },
    ],
  },
  {
    id: "villeroy-boch",
    label: "Villeroy & Boch",
    files: [
      {
        title: "Miski WC i toaleta myjąca EMPORA 2.0 - kolekcja na wyłączność",
        format: "ZIP",
        href: "https://www.elements-show.pl/sites/default/files/2025-08/EMPORA%202.0%20PLIKI%20CAD.zip",
      },
    ],
  },
] as const;
