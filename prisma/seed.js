const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // CREATING SITE CONFIG
    await prisma.siteConfig.upsert({
        where: { siteName: 'Leiebil' },
        update: {},
        create: {
            siteName: 'Leiebil'
        }
    });

    // CREATE PAGE CONFIGS
    await prisma.pageConfig.upsert({
        where: { route: '/' },
        update: {},
        create: {
            route: '/',
            pageName: 'Leiebil',
            title: 'Forside',
            description: 'Leiebil er den beste appen ever'
        }
    });

    await prisma.pageConfig.upsert({
        where: { route: '/error' },
        update: {},
        create: {
            route: '/error',
            pageName: 'Feilmelding',
            title: 'Feilmelding',
            description: 'Leiebil er den beste appen ever'
        }
    });

    await prisma.pageConfig.upsert({
        where: { route: '/login' },
        update: {},
        create: {
            route: '/login',
            pageName: 'Logg inn',
            title: 'Logg inn',
            description: 'Leiebil er den beste appen ever'
        }
    });

    await prisma.pageConfig.upsert({
        where: { route: '/logout' },
        update: {},
        create: {
            route: '/logout',
            pageName: 'Logg ut',
            title: 'Logg ut',
            description: 'Leiebil er den beste appen ever'
        }
    });

    await prisma.pageConfig.upsert({
        where: { route: '/adverts' },
        update: {},
        create: {
            route: '/adverts',
            pageName: 'Leiebil markedsplass',
            title: 'Markedsplass',
            description: 'Leiebil er den beste appen ever'
        }
    });

    await prisma.pageConfig.upsert({
        where: { route: '/adverts/new' },
        update: {},
        create: {
            route: '/adverts/new',
            pageName: 'Registrer bil for utleie',
            title: 'Legg til bil',
            description: 'Leiebil er den beste appen ever'
        }
    });

    await prisma.pageConfig.upsert({
        where: { route: '/adverts/edit' },
        update: {},
        create: {
            route: '/adverts/edit',
            pageName: 'Endre annonse',
            title: 'Endre annonse',
            description: 'Leiebil er den beste appen ever'
        }
    });

    await prisma.pageConfig.upsert({
        where: { route: '/messages' },
        update: {},
        create: {
            route: '/messages',
            pageName: 'Meldinger',
            title: 'Meldinger',
            description: 'Leiebil er den beste appen ever'
        }
    });

    await prisma.pageConfig.upsert({
        where: { route: '/profile' },
        update: {},
        create: {
            route: '/profile',
            pageName: 'Profil',
            title: 'Profil',
            description: 'Leiebil er den beste appen ever'
        }
    });

    // CREATING USER TYPES
    await prisma.userType.upsert({
        where: { type: 'Admin' },
        update: {},
        create: {
            type: 'Admin'
        }
    });

    await prisma.userType.upsert({
        where: { type: 'User' },
        update: {},
        create: {
            type: 'User'
        }
    });

    // CREATING LICENSE CLASSES
    await prisma.licenseClass.upsert({
        where: { className: 'B' },
        update: {},
        create: {
            className: 'B',
            classDescription: 'Personbil'
        }
    });

    await prisma.licenseClass.upsert({
        where: { className: 'BE' },
        update: {},
        create: {
            className: 'BE',
            classDescription: 'Personbil med tilhenger'
        }
    });

    await prisma.licenseClass.upsert({
        where: { className: 'C' },
        update: {},
        create: {
            className: 'C',
            classDescription: 'Lastebil'
        }
    });

    await prisma.licenseClass.upsert({
        where: { className: 'D1' },
        update: {},
        create: {
            className: 'D1',
            classDescription: 'Minibuss'
        }
    });

    await prisma.licenseClass.upsert({
        where: { className: 'T' },
        update: {},
        create: {
            className: 'T',
            classDescription: 'Traktor'
        }
    });

    // CREATING FUEL TYPES
    await prisma.fuelType.upsert({
        where: { type: 'Gasoline' },
        update: {},
        create: {
            type: 'Gasoline',
            description: 'Bensin'
        }
    });

    await prisma.fuelType.upsert({
        where: { type: 'Diesel' },
        update: {},
        create: {
            type: 'Diesel',
            description: 'Diesel'
        }
    });

    await prisma.fuelType.upsert({
        where: { type: 'Electric' },
        update: {},
        create: {
            type: 'Electric',
            description: 'Elektrisk'
        }
    });

    // CREATING TRANSMISSION TYPES
    await prisma.transmissionType.upsert({
        where: { type: 'Manual' },
        update: {},
        create: {
            type: 'Manual',
            description: 'Manuell'
        }
    });

    await prisma.transmissionType.upsert({
        where: { type: 'Automatic' },
        update: {},
        create: {
            type: 'Automatic',
            description: 'Automatisk'
        }
    });

    // CREATING WHEEL DRIVE TYPES
    await prisma.wheelDriveType.upsert({
        where: { type: 'All wheel drive' },
        update: {},
        create: {
            type: 'All wheel drive',
            description: 'Firehjulstrekk'
        }
    });

    await prisma.wheelDriveType.upsert({
        where: { type: 'Front wheel drive' },
        update: {},
        create: {
            type: 'Front wheel drive',
            description: 'Forhjulsdrift'
        }
    });

    await prisma.wheelDriveType.upsert({
        where: { type: 'Rear wheel drive' },
        update: {},
        create: {
            type: 'Rear wheel drive',
            description: 'Bakhjulsdrift'
        }
    });

    // CREATING USERS WITH VEHICLES

    // Ibrahim Bolstad - 93f8f50e-fa2b-457e-8713-947283d8141c
    await prisma.user.upsert({
        where: {
            email: 'ibolstad@outlook.com'
        },
        update: {},
        create: {
            uuid: '93f8f50e-fa2b-457e-8713-947283d8141c',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'ibolstad@outlook.com',
            phone: '+47 98793648',
            firstName: 'Ibrahim',
            lastName: 'Bolstad',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-10-20T07:53:53'),
            vehicleAdverts: {
                create: {
                    uuid: 'e908d9ac-27d3-46b2-8401-b876d0443d22',
                    registrationNumber: 'LB 28103',
                    licenseClass: {
                        connect: {
                            className: 'B'
                        }
                    },
                    fuelType: {
                        connect: {
                            type: 'Gasoline'
                        }
                    },
                    vehicleImages: {
                        create: [
                            {
                                fileLocation:
                                    '/uploads/e908d9ac-27d3-46b2-8401-b876d0443d22_1.webp'
                            },
                            {
                                fileLocation:
                                    '/uploads/e908d9ac-27d3-46b2-8401-b876d0443d22_2.webp'
                            }
                        ]
                    },
                    transmissionType: {
                        connect: {
                            type: 'Automatic'
                        }
                    },
                    wheelDriveType: {
                        connect: {
                            type: 'Front wheel drive'
                        }
                    },
                    streetAddress: 'Lundgårds vei 14',
                    city: 'Sarpsborg',
                    postalCode: '1710',
                    seatAmount: 5,
                    brand: 'Toyota',
                    model: 'Corolla',
                    modelYear: 2004,
                    weightInKg: 1190,
                    mileageInKm: 121784,
                    color: 'Grå',
                    hasHitch: true,
                    costPerHourInNok: 40,
                    advertTitle:
                        '5-seter Toyota Corolla, passer fint til korte turer',
                    advertTitleSearch:
                        '5-seter toyota corolla, passer fint til korte turer',
                    advertDescription:
                        'Hvis du bare trenger å leie en billig bil for en kjapp tur til Sverige, venner eller familietreff vil denne fungere utmerket. Det er innstallert bedre oppvarming, slik at man slipper å fryse i bilen på vinteren. Ellers er bilen klar til bruk. Jeg leier den ut da jeg har fått hjemmekontor, og dermed sjeldent bruker bilen lenger. Hvis du ønsker å leie bilen en dag, eller en helg, så er det bare å sende meg en melding, så avtaler vi tidspunkt for overlevering.',
                    advertDescriptionSearch:
                        'hvis du bare trenger å leie en billig bil for en kjapp tur til sverige, venner eller familietreff vil denne fungere utmerket. det er innstallert bedre oppvarming, slik at man slipper å fryse i bilen på vinteren. ellers er bilen klar til bruk. jeg leier den ut da jeg har fått hjemmekontor, og dermed sjeldent bruker bilen lenger. hvis du ønsker å leie bilen en dag, eller en helg, så er det bare å sende meg en melding, så avtaler vi tidspunkt for overlevering.',
                    isPublished: true,
                    createdTimestamp: new Date('2022-10-20T08:02:21')
                }
            }
        }
    });

    // Andre Hasle - 3668b213-2261-46b8-813a-97e1f408119e
    await prisma.user.upsert({
        where: {
            email: 'andrehal88@gmail.com'
        },
        update: {},
        create: {
            uuid: '3668b213-2261-46b8-813a-97e1f408119e',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'andrehal88@gmail.com',
            phone: '+47 47846113',
            firstName: 'Andre',
            lastName: 'Hasle',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-10-21T09:21:52'),
            vehicleAdverts: {
                create: [
                    {
                        uuid: 'ef54c465-33ad-40ee-83b0-43d1beb07ec1',
                        registrationNumber: 'LB 58390',
                        licenseClass: {
                            connect: {
                                className: 'B'
                            }
                        },
                        fuelType: {
                            connect: {
                                type: 'Gasoline'
                            }
                        },
                        vehicleImages: {
                            create: {
                                fileLocation:
                                    '/uploads/ef54c465-33ad-40ee-83b0-43d1beb07ec1_1.webp'
                            }
                        },
                        transmissionType: {
                            connect: {
                                type: 'Automatic'
                            }
                        },
                        wheelDriveType: {
                            connect: {
                                type: 'All wheel drive'
                            }
                        },
                        streetAddress: 'Gunbjørgs vei 12',
                        city: 'Rolvsøy',
                        postalCode: '1664',
                        seatAmount: 5,
                        brand: 'Suzuki',
                        model: 'SX4',
                        modelYear: 2012,
                        weightInKg: 1764,
                        mileageInKm: 68213,
                        color: 'Rød',
                        hasHitch: true,
                        costPerHourInNok: 35,
                        advertTitle: 'Liten og fin Suzuki',
                        advertTitleSearch: 'liten og fin suzuki',
                        advertDescription:
                            'Bilen har 5 seter, og passer fint til deg som bare trenger en bil i en mindre periode. Det er installert ryggekamera, slik at parkeringen ikke blir noe problem. Ta kontakt dersom du ønsker å leie bilen, enten på melding her, eller ved å ringe mobil +47 47846113.',
                        advertDescriptionSearch:
                            'bilen har 5 seter, og passer fint til deg som bare trenger en bil i en mindre periode. det er installert ryggekamera, slik at parkeringen ikke blir noe problem. ta kontakt dersom du ønsker å leie bilen, enten på melding her, eller ved å ringe mobil +47 47846113.',
                        isPublished: true,
                        createdTimestamp: new Date('2022-10-21T09:53:43')
                    },
                    {
                        uuid: '1be1aa29-88dd-468b-9514-f6ad0b82c360',
                        registrationNumber: 'LB 92712',
                        licenseClass: {
                            connect: {
                                className: 'B'
                            }
                        },
                        fuelType: {
                            connect: {
                                type: 'Gasoline'
                            }
                        },
                        vehicleImages: {
                            create: [
                                {
                                    fileLocation:
                                        '/uploads/1be1aa29-88dd-468b-9514-f6ad0b82c360_1.webp'
                                },
                                {
                                    fileLocation:
                                        '/uploads/1be1aa29-88dd-468b-9514-f6ad0b82c360_2.webp'
                                }
                            ]
                        },
                        transmissionType: {
                            connect: {
                                type: 'Automatic'
                            }
                        },
                        wheelDriveType: {
                            connect: {
                                type: 'All wheel drive'
                            }
                        },
                        streetAddress: 'Gunbjørgs vei 12',
                        city: 'Rolvsøy',
                        postalCode: '1664',
                        seatAmount: 5,
                        brand: 'Subaru',
                        model: 'Legacy',
                        modelYear: 2006,
                        weightInKg: 1485,
                        mileageInKm: 82834,
                        color: 'Grå',
                        hasHitch: false,
                        costPerHourInNok: 60,
                        advertTitle:
                            'Romslig Subaru med god bagasjeplass og 5 seter',
                        advertTitleSearch:
                            'romslig subaru med god bagasjeplass og 5 seter',
                        advertDescription:
                            'Dette er bilen for deg som trenger god plass, f.eks. hvis du har mye å ha med på turen. Bilen har god oppvarming, inkludert setevarmere foran. Den har også nettopp vært på verksted, så alt er i tipp topp stand.',
                        advertDescriptionSearch:
                            'dette er bilen for deg som trenger god plass, f.eks. hvis du har mye å ha med på turen. bilen har god oppvarming, inkludert setevarmere foran. den har også nettopp vært på verksted, så alt er i tipp topp stand.',
                        isPublished: true,
                        createdTimestamp: new Date('2022-10-21T10:02:12')
                    }
                ]
            }
        }
    });

    // Astrid Reinholdtsen - efff59dd-c87e-4bac-8878-0b51dc127a2d
    await prisma.user.upsert({
        where: {
            email: 'astridrein@gmail.com'
        },
        update: {},
        create: {
            uuid: 'efff59dd-c87e-4bac-8878-0b51dc127a2d',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'astridrein@gmail.com',
            phone: '+47 46629103',
            firstName: 'Astrid',
            lastName: 'Reinholdtsen',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-10-23T21:35:32'),
            vehicleAdverts: {
                create: {
                    uuid: '8b3035a6-287e-4166-9816-41122b64f796',
                    registrationNumber: 'LB 28102',
                    licenseClass: {
                        connect: {
                            className: 'B'
                        }
                    },
                    fuelType: {
                        connect: {
                            type: 'Gasoline'
                        }
                    },
                    vehicleImages: {
                        create: [
                            {
                                fileLocation:
                                    '/uploads/8b3035a6-287e-4166-9816-41122b64f796_1.webp'
                            },
                            {
                                fileLocation:
                                    '/uploads/8b3035a6-287e-4166-9816-41122b64f796_2.webp'
                            }
                        ]
                    },
                    transmissionType: {
                        connect: {
                            type: 'Manual'
                        }
                    },
                    wheelDriveType: {
                        connect: {
                            type: 'Front wheel drive'
                        }
                    },
                    streetAddress: 'Øraveien 3',
                    city: 'Gamle Fredrikstad',
                    postalCode: '1630',
                    seatAmount: 5,
                    brand: 'Ford',
                    model: 'KA+',
                    modelYear: 2016,
                    weightInKg: 980,
                    mileageInKm: 37021,
                    color: 'Blå',
                    hasHitch: false,
                    costPerHourInNok: 45,
                    advertTitle: 'Lite brukt Ford i god stand, 5 seter',
                    advertTitleSearch: 'lite brukt ford i god stand, 5 seter',
                    advertDescription:
                        'Liten bil som er enkel å navigere og kjøre i, og passer spesielt bra om du skal kjøre mye i bymiljø. Har greit med bagasjeplass, med mulighet til å slå ned setene om man trenger ekstra plass. Bruker ikke bilen på mandager, tirsdager eller i helger, så det er bare å ta kontakt dersom du ønsker å leie på en av de dagene.',
                    advertDescriptionSearch:
                        'liten bil som er enkel å navigere og kjøre i, og passer spesielt bra om du skal kjøre mye i bymiljø. har greit med bagasjeplass, med mulighet til å slå ned setene om man trenger ekstra plass. bruker ikke bilen på mandager, tirsdager eller i helger, så det er bare å ta kontakt dersom du ønsker å leie på en av de dagene.',
                    isPublished: true,
                    createdTimestamp: new Date('2022-10-24T07:19:58')
                }
            }
        }
    });

    // Julie Sæter - 92d2e850-0f5d-40e1-b004-be33a0aff763
    await prisma.user.upsert({
        where: {
            email: 'julieseter92@outlook.com'
        },
        update: {},
        create: {
            uuid: '92d2e850-0f5d-40e1-b004-be33a0aff763',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'julieseter92@outlook.com',
            phone: '+47 91527431',
            firstName: 'Julie',
            lastName: 'Sæter',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-10-24T10:13:20'),
            vehicleAdverts: {
                create: {
                    uuid: '4bea56b5-8142-4e94-abef-c01850032262',
                    registrationNumber: 'EL 52701',
                    licenseClass: {
                        connect: {
                            className: 'B'
                        }
                    },
                    fuelType: {
                        connect: {
                            type: 'Electric'
                        }
                    },
                    vehicleImages: {
                        create: [
                            {
                                fileLocation:
                                    '/uploads/4bea56b5-8142-4e94-abef-c01850032262_1.webp'
                            },
                            {
                                fileLocation:
                                    '/uploads/4bea56b5-8142-4e94-abef-c01850032262_2.webp'
                            }
                        ]
                    },
                    transmissionType: {
                        connect: {
                            type: 'Manual'
                        }
                    },
                    wheelDriveType: {
                        connect: {
                            type: 'Front wheel drive'
                        }
                    },
                    streetAddress: 'Torpedalsveien 22',
                    city: 'Tistedal',
                    postalCode: '1792',
                    seatAmount: 5,
                    brand: 'Renault',
                    model: 'Zoe',
                    modelYear: 2016,
                    weightInKg: 1427,
                    mileageInKm: 44329,
                    color: 'Svart',
                    hasHitch: false,
                    costPerHourInNok: 60,
                    advertTitle:
                        'Liten men romslig Renault Zoe elbil med 5 seter',
                    advertTitleSearch:
                        'liten men romslig renault zoe elbil med 5 seter',
                    advertDescription:
                        'Liten elbil med god plass. Bilen har en rekkevidde på rundt 210 km, så du kan komme deg rundt enkelt uten å lade for ofte. Lader følger med og ligger i bagasjerommet. Hvis du har noen spørsmål, er det bare å sende en melding :)',
                    advertDescriptionSearch:
                        'liten elbil med god plass. bilen har en rekkevidde på rundt 210 km, så du kan komme deg rundt enkelt uten å lade for ofte. lader følger med og ligger i bagasjerommet. hvis du har noen spørsmål, er det bare å sende en melding :)',
                    isPublished: true,
                    createdTimestamp: new Date('2022-10-24T10:21:01')
                }
            }
        }
    });

    // Henry Kildal - 5eb42e5c-a441-4b90-a4a8-d8682182b03d
    await prisma.user.upsert({
        where: {
            email: 'hk@elnordic.no'
        },
        update: {},
        create: {
            uuid: '5eb42e5c-a441-4b90-a4a8-d8682182b03d',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'hk@elnordic.no',
            phone: '+47 45271832',
            firstName: 'Henry',
            lastName: 'Kildal',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-10-28T11:03:11'),
            vehicleAdverts: {
                create: {
                    uuid: 'd87b694f-dab0-47d0-959d-e27c6ff5f979',
                    registrationNumber: 'LB 43028',
                    licenseClass: {
                        connect: {
                            className: 'B'
                        }
                    },
                    fuelType: {
                        connect: {
                            type: 'Diesel'
                        }
                    },
                    vehicleImages: {
                        create: [
                            {
                                fileLocation:
                                    '/uploads/d87b694f-dab0-47d0-959d-e27c6ff5f979_1.webp'
                            },
                            {
                                fileLocation:
                                    '/uploads/d87b694f-dab0-47d0-959d-e27c6ff5f979_2.webp'
                            }
                        ]
                    },
                    transmissionType: {
                        connect: {
                            type: 'Manual'
                        }
                    },
                    wheelDriveType: {
                        connect: {
                            type: 'All wheel drive'
                        }
                    },
                    streetAddress: 'Stenbruddveien 14',
                    city: 'Skjeberg',
                    postalCode: '1746',
                    seatAmount: 7,
                    brand: 'Nissan',
                    model: 'X-Trail',
                    modelYear: 2015,
                    weightInKg: 1713,
                    mileageInKm: 58721,
                    color: 'Grå',
                    hasHitch: true,
                    costPerHourInNok: 80,
                    advertTitle:
                        'Stor og kraftig AWD med god plass og støtte for tilhenger, 7 seter',
                    advertTitleSearch:
                        'stor og kraftig AWD med god plass og støtte for tilhenger, 7 seter',
                    advertDescription:
                        'Stor og romslig bil. Bilen har 7 seter hvis man slår opp de 2 setene i bagasjerommet. Da er det fortsatt noe plass til bagasje. Eventuelt, kan man slå ned disse 2 setene og få ekstremt god bagasjeplass. Hvis du ønsker å leie bilen, ta kontakt så kan vi avtale tidsrom. Jeg er villig til å diskutere på prisen, avhengig av hvor lenge den skal leies.',
                    advertDescriptionSearch:
                        'stor og romslig bil. bilen har 7 seter hvis man slår opp de 2 setene i bagasjerommet. da er det fortsatt noe plass til bagasje. eventuelt, kan man slå ned disse 2 setene og få ekstremt god bagasjeplass. hvis du ønsker å leie bilen, ta kontakt så kan vi avtale tidsrom. jeg er villig til å diskutere på prisen, avhengig av hvor lenge den skal leies.',
                    isPublished: true,
                    createdTimestamp: new Date('2022-10-28T12:05:06')
                }
            }
        }
    });

    // Kari Nygård - 78210bae-ddc0-4bb3-88dd-04a1ead47a66
    await prisma.user.upsert({
        where: {
            email: 'karinanygaard@gmail.com'
        },
        update: {},
        create: {
            uuid: '78210bae-ddc0-4bb3-88dd-04a1ead47a66',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'karinanygaard@gmail.com',
            phone: '+47 95283712',
            firstName: 'Karina',
            lastName: 'Nygård',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-10-29T18:42:09'),
            vehicleAdverts: {
                create: {
                    uuid: '306bdd55-73ba-40bf-bdbb-fe637838c409',
                    registrationNumber: 'LB 83721',
                    licenseClass: {
                        connect: {
                            className: 'B'
                        }
                    },
                    fuelType: {
                        connect: {
                            type: 'Gasoline'
                        }
                    },
                    vehicleImages: {
                        create: [
                            {
                                fileLocation:
                                    '/uploads/306bdd55-73ba-40bf-bdbb-fe637838c409_1.webp'
                            },
                            {
                                fileLocation:
                                    '/uploads/306bdd55-73ba-40bf-bdbb-fe637838c409_2.webp'
                            },
                            {
                                fileLocation:
                                    '/uploads/306bdd55-73ba-40bf-bdbb-fe637838c409_3.webp'
                            }
                        ]
                    },
                    transmissionType: {
                        connect: {
                            type: 'Manual'
                        }
                    },
                    wheelDriveType: {
                        connect: {
                            type: 'Front wheel drive'
                        }
                    },
                    streetAddress: 'Brødløsveien 19',
                    city: 'Halden',
                    postalCode: '1782',
                    seatAmount: 5,
                    brand: 'Kia',
                    model: 'Ceed',
                    modelYear: 2016,
                    weightInKg: 1204,
                    mileageInKm: 23851,
                    color: 'Svart',
                    hasHitch: false,
                    costPerHourInNok: 65,
                    advertTitle: 'Kia 5-seter med stor bagasjeplass',
                    advertTitleSearch: 'kia 5-seter med stor bagasjeplass',
                    advertDescription:
                        'Jeg bruker bilen skjeldent utenom handleturer i helgene. Leier derfor ut bilen på hverdager, så det er bare å ta kontakt hvis du er interresert. Send en melding, så svarer jeg raskt :)',
                    advertDescriptionSearch:
                        'jeg bruker bilen skjeldent utenom handleturer i helgene. leier derfor ut bilen på hverdager, så det er bare å ta kontakt hvis du er interresert. send en melding, så svarer jeg raskt :)',
                    isPublished: true,
                    createdTimestamp: new Date('2022-10-30T20:13:42')
                }
            }
        }
    });

    // Erlend Hansen - adcf394d-0a59-40c8-a23a-1a322c97088b
    await prisma.user.upsert({
        where: {
            email: 'erlhan78@outlook.com'
        },
        update: {},
        create: {
            uuid: 'adcf394d-0a59-40c8-a23a-1a322c97088b',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'erlhan78@outlook.com',
            phone: '+47 47482112',
            firstName: 'Erlend',
            lastName: 'Hansen',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-11-02T08:33:42'),
            vehicleAdverts: {
                create: {
                    uuid: 'ac771767-efb2-4add-a35a-43b9c63a9c2e',
                    registrationNumber: 'LB 87427',
                    licenseClass: {
                        connect: {
                            className: 'B'
                        }
                    },
                    fuelType: {
                        connect: {
                            type: 'Gasoline'
                        }
                    },
                    vehicleImages: {
                        create: [
                            {
                                fileLocation:
                                    '/uploads/ac771767-efb2-4add-a35a-43b9c63a9c2e_1.webp'
                            },
                            {
                                fileLocation:
                                    '/uploads/ac771767-efb2-4add-a35a-43b9c63a9c2e_2.webp'
                            },
                            {
                                fileLocation:
                                    '/uploads/ac771767-efb2-4add-a35a-43b9c63a9c2e_3.webp'
                            }
                        ]
                    },
                    transmissionType: {
                        connect: {
                            type: 'Manual'
                        }
                    },
                    wheelDriveType: {
                        connect: {
                            type: 'Front wheel drive'
                        }
                    },
                    streetAddress: 'Fagerbakken 12',
                    city: 'Askim',
                    postalCode: '1813',
                    seatAmount: 5,
                    brand: 'Ford',
                    model: 'Focus',
                    modelYear: 2007,
                    weightInKg: 1386,
                    mileageInKm: 127481,
                    color: 'Grå',
                    hasHitch: true,
                    costPerHourInNok: 25,
                    advertTitle: 'Ford Focus leies ut til en billig penge',
                    advertTitleSearch:
                        'ford focus leies ut til en billig penge',
                    advertDescription:
                        'Bruker skjeldent denne bilen, og den står vanligvis fint i garasjen. Jeg har en annen bil som jeg bruker til vanlig, så istedenfor å la denne bilen støve ned i garasjen, er det heller bedre at andre får brukt den ved behov. Leier derfor ut denne til en billig penge. Det er så og si alltid ledig, så det er bare å ta kontakt hvis du trenger denne, også ved lengre perioder',
                    advertDescriptionSearch:
                        'bruker skjeldent denne bilen, og den står vanligvis fint i garasjen. jeg har en annen bil som jeg bruker til vanlig, så istedenfor å la denne bilen støve ned i garasjen, er det heller bedre at andre får brukt den ved behov. leier derfor ut denne til en billig penge. det er så og si alltid ledig, så det er bare å ta kontakt hvis du trenger denne, også ved lengre perioder',
                    isPublished: true,
                    createdTimestamp: new Date('2022-11-04T09:52:31')
                }
            }
        }
    });

    // Kenneth Larsen - 2b374bf1-78fb-4ce8-8823-fc13ffba848e
    await prisma.user.upsert({
        where: {
            email: 'kennethlarsen5@hotmail.com'
        },
        update: {},
        create: {
            uuid: '2b374bf1-78fb-4ce8-8823-fc13ffba848e',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'kennetharsen@hotmail.com',
            phone: '+47 47675821',
            firstName: 'Kenneth',
            lastName: 'Larsen',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-11-15T11:53:11')
        }
    });

    // Lina Strömberg - f21edf41-4995-4aa5-a17b-932a513e7875
    await prisma.user.upsert({
        where: {
            email: 'linastromberg1@gmail.com'
        },
        update: {},
        create: {
            uuid: 'f21edf41-4995-4aa5-a17b-932a513e7875',
            userType: {
                connect: {
                    type: 'User'
                }
            },
            email: 'linastromberg1@gmail.com',
            phone: '+46 0346-7562331',
            firstName: 'Lina',
            lastName: 'Strömberg',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-11-17T20:21:53')
        }
    });

    // Admin - 45f1fab3-4da4-4fb3-af6e-cbfba6f4ae7d
    await prisma.user.upsert({
        where: {
            email: 'admin@leiebil.no'
        },
        update: {},
        create: {
            uuid: '45f1fab3-4da4-4fb3-af6e-cbfba6f4ae7d',
            userType: {
                connect: {
                    type: 'Admin'
                }
            },
            email: 'admin@leiebil.no',
            phone: '+47 47756499',
            firstName: 'Admin',
            lastName: '',
            profileImageFileLocation: '/uploads/profileImage.webp',
            createdTimestamp: new Date('2022-10-01T12:00:00')
        }
    });

    // CREATING MESSAGES BETWEEN USERS

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: '2b374bf1-78fb-4ce8-8823-fc13ffba848e' // Kenneth
                }
            },
            toUser: {
                connect: {
                    uuid: '3668b213-2261-46b8-813a-97e1f408119e' // Andre
                }
            },
            content:
                'Hei! Jeg så annonsen din, og ønsker å leie Subaru bilen. Hvordan gjør vi dette? Jeg trenger den fredag fra kl 14:00 til ca. kl 20:00. Passer det for deg?',
            sentTimestamp: new Date('2022-11-21T12:19:03')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: '2b374bf1-78fb-4ce8-8823-fc13ffba848e' // Kenneth
                }
            },
            toUser: {
                connect: {
                    uuid: '93f8f50e-fa2b-457e-8713-947283d8141c' // Ibrahim Bolstad
                }
            },
            content:
                'Hei! Jeg sjekket annonsen din for Toyotaen. Jeg trenger en bil på fredag fra kl. 14-20 ca. Passer det? og hvordan gjør vi det med betaling og slikt? Hører fra deg.',
            sentTimestamp: new Date('2022-11-22T17:42:07')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: '93f8f50e-fa2b-457e-8713-947283d8141c' // Ibrahim
                }
            },
            toUser: {
                connect: {
                    uuid: '2b374bf1-78fb-4ce8-8823-fc13ffba848e' // Kenneth
                }
            },
            content:
                'Hei Kenneth! Det passer helt fint, jeg har ikke tenkt til å bruke bilen den dagen. Bare møt opp på adressen min Lundgårds vei 14, 1710 Sarpsborg og ring på døra, så leverer jeg nøklene. Betaling skjer etter at bilen er levert tilbake, da kan vi bare ta det på Vipps :)',
            sentTimestamp: new Date('2022-11-22T18:05:42')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: '2b374bf1-78fb-4ce8-8823-fc13ffba848e' // Kenneth
                }
            },
            toUser: {
                connect: {
                    uuid: '93f8f50e-fa2b-457e-8713-947283d8141c' // Ibrahim
                }
            },
            content:
                'Takk for kjapt svar! Det høres veldig bra ut, da ses vi :)',
            sentTimestamp: new Date('2022-11-22T18:09:23')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: 'f21edf41-4995-4aa5-a17b-932a513e7875' // Lina
                }
            },
            toUser: {
                connect: {
                    uuid: '3668b213-2261-46b8-813a-97e1f408119e' // Andre
                }
            },
            content:
                'Hej, jag letar efter en bil som kan användas för vår resa i Norge. Vi kommer att behöva en bil från fredag 02.12 till söndag 04.12. Jag tänkte på Suzukien. Passar detta?',
            sentTimestamp: new Date('2022-11-24T21:17:07')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: 'f21edf41-4995-4aa5-a17b-932a513e7875' // Lina
                }
            },
            toUser: {
                connect: {
                    uuid: 'efff59dd-c87e-4bac-8878-0b51dc127a2d' // Astrid
                }
            },
            content:
                'Hej, jag letar efter en bil som kan användas för vår resa i Norge, och sedan din Ford. Vi kommer att behöva en bil från fredag 02.12 till söndag 04.12. Passar detta?',
            sentTimestamp: new Date('2022-11-24T21:25:37')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: 'f21edf41-4995-4aa5-a17b-932a513e7875' // Lina
                }
            },
            toUser: {
                connect: {
                    uuid: '92d2e850-0f5d-40e1-b004-be33a0aff763' // Julie
                }
            },
            content:
                'Hej, jag kollade din Zoe och undrade om den var tillgänglig fredag 02.12 till söndag 04.12, när vi ska på en resa till Norge. Passar detta?',
            sentTimestamp: new Date('2022-11-24T21:47:01')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: 'f21edf41-4995-4aa5-a17b-932a513e7875' // Lina
                }
            },
            toUser: {
                connect: {
                    uuid: 'adcf394d-0a59-40c8-a23a-1a322c97088b' // Erlend
                }
            },
            content:
                'Hej, jag letar efter en bil som kan användas för vår resa i Norge, och helst billigt. Jag lade märke till din Ford Focus. Vi kommer att behöva en bil från fredag 02.12 till söndag 04.12. Passar detta?',
            sentTimestamp: new Date('2022-11-24T22:04:21')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: 'adcf394d-0a59-40c8-a23a-1a322c97088b' // Erlend
                }
            },
            toUser: {
                connect: {
                    uuid: 'f21edf41-4995-4aa5-a17b-932a513e7875' // Lina
                }
            },
            content:
                'Hei Lina, det passer fint fra fredag 02.12 til søndag 04.12. Vet du hvilken klokkeslett dere ankommer på fredag for å hente bilen?',
            sentTimestamp: new Date('2022-11-25T07:42:12')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: 'f21edf41-4995-4aa5-a17b-932a513e7875' // Lina
                }
            },
            toUser: {
                connect: {
                    uuid: 'adcf394d-0a59-40c8-a23a-1a322c97088b' // Erlend
                }
            },
            content:
                'Vi kommer fram ca. kl 18.00 på eftermiddagen. Och hur är det med betalningen?',
            sentTimestamp: new Date('2022-11-25T11:23:21')
        }
    });

    await prisma.message.create({
        data: {
            fromUser: {
                connect: {
                    uuid: 'adcf394d-0a59-40c8-a23a-1a322c97088b' // Erlend
                }
            },
            toUser: {
                connect: {
                    uuid: 'f21edf41-4995-4aa5-a17b-932a513e7875' // Lina
                }
            },
            content:
                'Jeg er hjemme fra kl 16:00, så da er det bare å komme ca. 16:00. Betaling kan vi ordne etter at bilen er levert tilbake. Jeg antar at dere ikke har Vipps, så vi kan avklare bankoverføring eller lignende når dere kommer, det ordner vi :) Vi ses!',
            sentTimestamp: new Date('2022-11-25T16:47:52')
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
