const ActivityDropDownData = [
  {
    area : 'SW핵심역량',
    programs : [
      {
        program : '코딩 문제풀이',
        types : [
          {
            type : '백준 Bronze/Silver/Gold/Platinum/Diamond/Ruby',
            points : [
              {
                topic : '',
                point : 0,
              }
            ]
          },
          {
            type : '프로그래머스 1레벨/2레벨/3레벨 이상',
            points : [
              {
                topic : '',
                point : 0,
              }
            ]
          }
        ] // 이전티어와 현재 티어를 사용자가 직접 입력해 따로 계산
      },
      {
        program : 'SW 공모전',
        types : [
          {
            type : '(교내-학과주관)작품경진대회, 게임경진대회, 인공지능 경진대회 등',
            points : [
              {
                topic : '대상',
                point : 40
              },
              {
                topic : '금상',
                point : 30
              },
              {
                topic : '은상',
                point : 20
              },
              {
                topic : '동상',
                point : 10
              },
              {
                topic : '참여',
                point : 5
              },
            ]
          },
          {
            type : '(교내-학과외) 링크사업단 작품전시회 등', //점수 파악 확실히 안됨
            points : [
              {
                topic : '대상',
                point : 40
              },
              {
                topic : '금상',
                point : 30
              },
              {
                topic : '은상',
                point : 20
              },
              {
                topic : '동상',
                point : 10
              },
              {
                topic : '참여',
                point : 5
              },
            ]
          },
          {
            type : '(교외-IITP연관) 해커톤, 워크숍, 인재페스티벌 등', //점수 파악 확실히 안됨
            points : [
              {
                topic : '대상',
                point : 100
              },
              {
                topic : '금상',
                point : 70
              },
              {
                topic : '은상',
                point : 50
              },
              {
                topic : '동상',
                point : 30
              },
              {
                topic : '참여',
                point : 10
              },
            ]
          },
          {
            type : '(교외-그외) 도내/호남권', //임의 계산 수정필요
            points : [
              {
                topic : '대상',
                point : 70
              },
              {
                topic : '금상',
                point : 55
              },
              {
                topic : '은상',
                point : 40
              },
              {
                topic : '동상',
                point : 25
              },
              {
                topic : '참여',
                point : 10
              },
            ]
          },
          {
            type : '(교외-그외) 전국권', //점수파악 확실히 안됨
            points : [
              {
                topic : '대상',
                point : 100
              },
              {
                topic : '금상',
                point : 70
              },
              {
                topic : '은상',
                point : 50
              },
              {
                topic : '동상',
                point : 30
              },
              {
                topic : '참여',
                point : 10
              },
            ]
          },
          {
            type : '국외 공모전 (ACM-ICPC포함)', //임의 계산 정확한 정보필요
            points : [
              {
                topic : '대상',
                point : 200
              },
              {
                topic : '금상',
                point : 155
              },
              {
                topic : '은상',
                point : 110
              },
              {
                topic : '동상',
                point : 65
              },
              {
                topic : '참여',
                point : 20
              },
            ]
          }
        ]
      },
      {
        program : '사업단 SW 멘토링 활동',
        types : [
          {
            type : '멘토 활동 (ABF제 등)',
            points : [
              {
                topic : '',
                point : 20
              }
            ]
          },
          {
            type : '멘토 참여',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
          }
        ]
      },
      {
        program : '오픈소스 SW 기여',
        types : [
          {
            type : '(외부) Pull request Merge',
            points : [
              {
                topic : '',
                point : 20,
              }
            ]
          },
          {
            type : '(외부) 소프트웨어 등록',
            points : [
              {
                topic : '',
                point : 30,
              }
            ]
          },
          {
            type : '(사업단) SW 플랫폼 개발 활동(J-EduTools, Watche r등)',
            points : [
              {
                topic : '',
                point : 20,
              }
            ]
          }
        ]
      },
      {
        program : '전공 분야 자격증',
        types : [
          {
            type : '상세정보에 자격증을 설명해주세요',
            points : [
              {
                topic : '',
                point : 40,
              }
            ]
          }
        ]
      },
      {
        program : 'SW 교육/특강',
        types : [
          {
            type : '사업단 주관(3일 이상)',
            points : [
              {
                topic : '',
                point : 20,
              }
            ]
          },
          {
            type : '사업단 주관(3일 미만)',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
          },
          {
            type : '그 외 SW 관련 교육 (3일 이상)',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
          },
          {
            type : '그 외 SW 관련 교육 (3일 미만)',
            points : [
              {
                topic : '',
                point : 5,
              }
            ]
          }
        ]
      },
      {
        program : 'TOPCIT',
        types : [
          {
            type : '1등급',
            points : [
              {
                topic : '',
                point : 5,
              }
            ]
          },
          {
            type : '2등급',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
          },
          {
            type : '3등급',
            points : [
              {
                topic : '',
                point : 15,
              }
            ]
          },
          {
            type : '4등급',
            points : [
              {
                topic : '',
                point : 20,
              }
            ]
          },
          {
            type : '5등급',
            points : [
              {
                topic : '',
                point : 25,
              }
            ]
          }
        ]
      },
      {
        program : 'SW 동아리',
        types : [
          {
            type : '사업단이 인정한 SW동아리 활동',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
          }
        ]
      },
    ]
  },
  {
    area : 'SW산학협력·창업역량',
    programs : [
      {
        program : 'SW 인턴십',
        types : [
          {
            type : '연구실 인턴',
            points : [
              {
                topic : '',
                point : 20,
              }
            ]
          },
          {
            type : '국내 SW기업 인턴십',
            points : [
              {
                topic : '4주 미만',
                point : 30,
              },
              {
                topic : '4주 이상',
                point : 45,
              },
              {
                topic : '8주 이상',
                point : 60,
              },
              {
                topic : '15주 이상',
                point : 90,
              },
            ]
          },
        ]
      },
      {
        program : '현장체험',
        types : [
          {
            type : '학교/학과 및 기관 주도 기업탐방, 전시회 참가 등',
            points : [
              {
                topic : '',
                point : 5,
              }
            ]
          },
        ]
      }, 
      {
        program : '연구활동',
        types : [
          {
            type : '논문 게재 - 국내, 국외학회/국내, 해외, SCIE 저널(SW 중심대학 사사표기시)',
            points : [
              {
                topic : '대상',
                point : 100,
              },
              {
                topic : '금상',
                point : 40,
              },
              {
                topic : '은상',
                point : 30,
              },
              {
                topic : '동상',
                point : 30,
              },
              {
                topic : '참여',
                point : 20,
              },
            ]
          },
          {
            type : '산학협력캡스톤(산학실전캡스톤) 과목 이수',
            points : [
              {
                topic : '',
                point : 20,
              }
            ]
          },
          {
            type : '산학협력프로젝트 참여(2학기 적용)',
            points : [
              {
                topic : '5개월 미만',
                point : 10,
              },
              {
                topic : '5개월 이상',
                point : 20,
              },
            ],
          },
          {
            type : '국내 특허 출원/등록',
            points : [
              {
                topic : '출원',
                point : 30,
              },
              {
                topic : '등록',
                point : 50,
              },
            ],
          },
          {
            type : '해외 특허 출원/등록',
            points : [
              {
                topic : '출원',
                point : 50,
              },
              {
                topic : '등록',
                point : 100,
              },
            ]
          }
        ]
      },
      {
        program : 'SW 창업',
        types : [
          {
            type : '신규 벤처창업',
            points : [
              {
                topic : '',
                point : 100,
              }
            ]
          },
          {
            type : '신규 고용창출',
            points : [
              {
                topic : '',
                point : 20,
              }
            ] 
          },
        ]
      },
      {
        program : 'SW 창업동아리',
        types : [
          {
            type : '팀구성/지속적 활동 (학과장 또는 지도교수 서명 필요)',
            points : [
              {
                topic : '팀구성',
                point : 20,
              },
              {
                topic : '지속적 활동',
                point : 10,
              },
            ]
          }
        ]
      },
      {
        program : 'SW 창업프로그램 참여',
        types : [
          {
            type : '(사업단) 창업 아이템 경진대회, 온라인 창업수요 챌린지',
            points : [
              {
                topic : '참여',
                point : 10,
              },
              {
                topic : '입상',
                point : 50,
              },
            ]
          },
          {
            type : '(사업단) 창업캡스톤 풀 발굴 (사업단에 자료 제출)',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
          },
          {
            type : '(사업단, 교내, 교외) SW 창업 전문가 멘토링 및 각종 창업 교육 참여',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
          }
        ]
      }
    ]
  },
  {
    area : 'SW가치확산역량',
    programs : [
      {
        program : 'SW 관련 봉사',
        types : [
          {
            type : '(사업단, 교내) SW 가치확산 프로그램(세미나, 멘토 활동 등)',
            points : [
              {
                topic : '',
                point : 30,
              },
              
            ]
          },
          {
            type : 'SW관련 단체 봉사 활동',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
            //사용자가 직접 입력 가능하게
          }
        ]
      },
      {
        program : '타대학간 학술 교류',
        types : [
          {
            type : '타 SW 중심대학에서 운영하는 온/오프라인 SW기초/전공과목 수강시',
            points : [
              {
                topic : '',
                point : 10,
              }
            ]
          }
        ]
      }
    ]
  },
  {
    area : 'SW융합역량',
    programs : [
      {
        program : 'SW융합트랙',
        types : [
          {
            type : 'SW-STEMCELL 교과목 수강',
            points : [
              {
                topic : '',
                point : 20,
              }
            ]
          }
        ]
      },
      {
        program : 'SW 교양',
        types : [
          {
            type : 'SW 교양 과목 이수',
            points : [
              {
                topic : '',
                point : 20,
              }
            ]
          }
          
        ]
      }
    ]
  }
  
];



export default ActivityDropDownData;