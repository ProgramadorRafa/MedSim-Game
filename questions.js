const QUESTIONS = [
  {
    question: 'Qual é a faixa considerada de normotermia (temperatura corporal normal) para um adulto saudável aferida por via axilar/oral?',
    options: [
      '34,5 °C a 35,5 °C',
      '36,0 °C a 37,5 °C',
      '37,6 °C a 38,5 °C',
      '38,6 °C a 40,0 °C'
    ],
    correct: 1,
    explanation: 'A normotermia corresponde, nesta classificação, à temperatura corporal entre 36,0 °C e 37,5 °C em adultos. Os valores de referência podem variar conforme o local de aferição.'
  },
  {
    question: 'Como é denominada clinicamente a elevação da temperatura corporal acima de 37,8 °C decorrente de uma resposta imunológica do organismo?',
    options: [
      'Hipotermia',
      'Normotermia',
      'Febre (Pirexia)',
      'Hipertermia maligna'
    ],
    correct: 2,
    explanation: 'A febre, também chamada de pirexia, ocorre quando o organismo eleva o ponto de ajuste térmico, geralmente em resposta a processos infecciosos ou inflamatórios.'
  },
  {
    question: 'Qual termo técnico descreve o estado em que a temperatura corporal central encontra-se abaixo de 35,0 °C?',
    options: [
      'Hipotermia',
      'Febrícula',
      'Atermia',
      'Bradicardia'
    ],
    correct: 0,
    explanation: 'A hipotermia é caracterizada pela redução da temperatura corporal central para valores inferiores a 35,0 °C.'
  },

  {
    question: 'Qual é a faixa de frequência cardíaca de repouso considerada normal (normocardia) para um adulto saudável?',
    options: [
      '40 a 60 bpm',
      '60 a 100 bpm',
      '100 a 140 bpm',
      '120 a 160 bpm'
    ],
    correct: 1,
    explanation: 'A frequência cardíaca normal em adultos em repouso geralmente varia entre 60 e 100 batimentos por minuto (bpm).'
  },
  {
    question: 'Como se define clinicamente uma frequência cardíaca de repouso inferior a 60 bpm em um adulto não atleta?',
    options: [
      'Taquicardia',
      'Bradicardia',
      'Arritmia sinusal',
      'Taquipneia'
    ],
    correct: 1,
    explanation: 'A bradicardia é definida como frequência cardíaca inferior a 60 bpm em adultos, podendo ser fisiológica em determinadas situações.'
  },
  {
    question: 'Qual condição hemodinâmica é caracterizada por uma frequência cardíaca mantida acima de 100 bpm em adultos em repouso?',
    options: [
      'Bradipneia',
      'Hipertensão',
      'Taquicardia',
      'Normocardia'
    ],
    correct: 2,
    explanation: 'A taquicardia caracteriza-se por uma frequência cardíaca superior a 100 bpm em adultos em repouso.'
  },

  {
    question: 'Qual é a faixa de frequência respiratória considerada normal (eupneia) para um adulto saudável em repouso?',
    options: [
      '8 a 12 irpm',
      '12 a 20 irpm',
      '22 a 30 irpm',
      '30 a 40 irpm'
    ],
    correct: 1,
    explanation: 'A eupneia corresponde à respiração normal, geralmente entre 12 e 20 incursões respiratórias por minuto (irpm) em adultos.'
  },
  {
    question: 'Qual termo técnico descreve a respiração anormalmente acelerada, com frequência superior a 20 irpm em adultos?',
    options: [
      'Bradipneia',
      'Taquipneia',
      'Apneia',
      'Dispneia'
    ],
    correct: 1,
    explanation: 'A taquipneia é o aumento da frequência respiratória, geralmente acima de 20 irpm em adultos em repouso.'
  },
  {
    question: 'Como se denomina a redução da frequência respiratória abaixo de 12 movimentos respiratórios por minuto em adultos?',
    options: [
      'Bradipneia',
      'Ortopneia',
      'Taquipneia',
      'Eupneia'
    ],
    correct: 0,
    explanation: 'A bradipneia corresponde à diminuição da frequência respiratória, geralmente abaixo de 12 irpm em adultos.'
  },

  {
    question: 'Segundo a classificação tradicional, quais valores de pressão arterial (PA) são considerados ótimos para um adulto?',
    options: [
      'Abaixo de 120 x 80 mmHg',
      'Entre 130 x 85 e 139 x 89 mmHg',
      'Exatamente 140 x 90 mmHg',
      'Acima de 150 x 95 mmHg'
    ],
    correct: 0,
    explanation: 'Na classificação tradicional, a pressão arterial ótima apresenta valores sistólicos inferiores a 120 mmHg e diastólicos inferiores a 80 mmHg.'
  },
  {
    question: 'A partir de qual limiar pressórico um adulto é diagnosticado com hipertensão arterial sistêmica em aferição de consultório, segundo o critério tradicional?',
    options: [
      '120 x 80 mmHg',
      '130 x 85 mmHg',
      '140 x 90 mmHg',
      '160 x 100 mmHg'
    ],
    correct: 2,
    explanation: 'Pelo critério tradicional, valores persistentes de pressão sistólica iguais ou superiores a 140 mmHg ou diastólica iguais ou superiores a 90 mmHg indicam hipertensão. O diagnóstico exige avaliação adequada e confirmação.'
  },
  {
    question: 'Como é chamada a condição caracterizada por níveis de pressão arterial significativamente baixos (geralmente PAS inferior a 90 mmHg)?',
    options: [
      'Hipertensão',
      'Hipotensão',
      'Hipoxemia',
      'Bradicardia'
    ],
    correct: 1,
    explanation: 'A hipotensão corresponde à pressão arterial baixa, frequentemente associada a valores de pressão sistólica inferiores a 90 mmHg, especialmente quando acompanhada de sintomas.'
  },

  {
    question: 'Qual é a porcentagem de saturação periférica de oxigênio (SpO2) considerada normal para um adulto saudável respirando ar ambiente ao nível do mar?',
    options: [
      '85% a 89%',
      '90% a 94%',
      '95% a 100%',
      'Sempre 100% fixa'
    ],
    correct: 2,
    explanation: 'A saturação periférica de oxigênio normalmente varia entre 95% e 100% em adultos saudáveis ao nível do mar. Algumas condições clínicas e altitudes podem modificar esses valores.'
  },
  {
    question: 'Como é denominada clinicamente a diminuição da concentração de oxigênio no sangue arterial (SpO2 abaixo do normal)?',
    options: [
      'Hipóxia tecidual',
      'Hipoxemia',
      'Hipercapnia',
      'Cianose'
    ],
    correct: 1,
    explanation: 'A hipoxemia é a redução da oxigenação do sangue arterial. A oximetria de pulso permite estimar essa condição de maneira não invasiva.'
  },
  {
    question: 'Qual equipamento não invasivo é amplamente utilizado na prática clínica para monitorar a SpO2 e os batimentos cardíacos?',
    options: [
      'Esfigmomanômetro',
      'Estetoscópio',
      'Termômetro digital',
      'Oxímetro de pulso'
    ],
    correct: 3,
    explanation: 'O oxímetro de pulso é um dispositivo não invasivo utilizado para estimar a saturação periférica de oxigênio e monitorar a frequência cardíaca.'
  }
];