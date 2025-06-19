import { User } from '../users/entities/user.entity';
import { AppDataSource } from '../data-source';
import { Instructor } from '../instructors/entities/instructor.entity';
import { MembershipPlan } from '../membership-plans/entities/membership-plan.entity';

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const instructorRepository = AppDataSource.getRepository(Instructor);
  const membershipPlanRepository = AppDataSource.getRepository(MembershipPlan);

  const existingUsers = await userRepository.count();

  const existingInstructors = await instructorRepository.count();

  const existingMembershipPlan = await membershipPlanRepository.count();

  if (existingUsers === 0) {
    const newUsers = userRepository.create([
      {
        name: 'Allison Hill',
        username: 'ahill2023',
        email: 'ahill@hall.com',
        phone: '+13863794026',
        password:
          'ef277db1d76dc2736e4d4bf78814ab0f11e6bfea027a6c678378629406ac0344',
        gender: 'male',
        membership: 'premium',
        allowEmail: true,
        allowWhatsapp: true,
      },
      {
        name: 'Lisa Hensley',
        username: 'lhensley456',
        email: 'lhensley@ramirez-reid.com',
        phone: '5534192832',
        password:
          '1fc2e6a29ebb58761eff64dfb4bcb3f9675744c90badfd245e69ca3777e58518',
        gender: 'male',
        membership: 'basic',
        allowEmail: false,
        allowWhatsapp: true,
      },
      {
        name: 'Thomas Ellis',
        username: 'tellis789',
        email: 'tellis@yahoo.com',
        phone: '287.101.2269',
        password:
          '81aad9064bc67fc863faeb16337b52758747bbb5f7b7140395f0fc1baa01bd5b',
        gender: 'female',
        membership: 'premium',
        allowEmail: false,
        allowWhatsapp: false,
      },
      {
        name: 'John Doe',
        username: 'jdoe101',
        email: 'jdoe@example.com',
        phone: '212-456-7890',
        password:
          '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        gender: 'male',
        membership: 'basic',
        allowEmail: true,
        allowWhatsapp: true,
      },
      {
        name: 'Emily Parker',
        username: 'eparker123',
        email: 'eparker@mail.com',
        phone: '+441632960123',
        password:
          '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4',
        gender: 'female',
        membership: 'premium',
        allowEmail: true,
        allowWhatsapp: false,
      },
      {
        name: 'Michael Chen',
        username: 'mchen456',
        email: 'mchen@example.org',
        phone: '+81345678234',
        password:
          'f3abb86bd34cf4d52698f14c0da1dc610f08d349c8a3d1f324545949e9c8f9d9',
        gender: 'male',
        membership: 'premium',
        allowEmail: true,
        allowWhatsapp: true,
      },
      {
        name: 'Sarah Johnson',
        username: 'sjohnson789',
        email: 'sjohnson@business.com',
        phone: '02079460975',
        password:
          'b3cd915d758008bd19d0f2428fbb354b0e979f7a33e8c29e3e4f6a7c46c30876',
        gender: 'female',
        membership: 'basic',
        allowEmail: false,
        allowWhatsapp: true,
      },
      {
        name: 'David Kim',
        username: 'dkim101',
        email: 'dkim@tech.io',
        phone: '+821056789123',
        password:
          '8f6d9699ef35a90bd6e6b5875e4a6a3e3f5a5a7e5d5c5b5a5958575655545352',
        gender: 'male',
        membership: 'premium',
        allowEmail: true,
        allowWhatsapp: false,
      },
      {
        name: 'Robert Wilson',
        username: 'rwilson202',
        email: 'rwilson@example.net',
        phone: '+13124567890',
        password: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
        gender: 'male',
        membership: 'basic',
        allowEmail: true,
        allowWhatsapp: true,
      },
      {
        name: 'Jennifer Lee',
        username: 'jlee303',
        email: 'jlee@mail.org',
        phone: '+442345678901',
        password: 'z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0',
        gender: 'female',
        membership: 'premium',
        allowEmail: false,
        allowWhatsapp: true,
      },
    ]);
    await userRepository.save(newUsers);
  }

  if (existingInstructors === 0) {
    const newInstructors = instructorRepository.create([
      {
        name: 'Amanda Smith',
        photo: 'assets/instructors/amanda.png',
        profession: 'yoga',
        facebook: 'fb.com/amanda',
        twitter: 'twitter.com/amanda',
      },
      {
        name: 'Marco Rossi',
        photo: 'assets/instructors/marco.png',
        profession: 'zumba',
        facebook: 'fb.com/marco',
        twitter: 'twitter.com/marco',
      },
      {
        name: 'John Morales',
        photo: 'assets/instructors/john.png',
        profession: 'crossfit',
        facebook: 'fb.com/john',
        twitter: 'twitter.com/john',
      },
      {
        name: 'Fatima Trump',
        photo: 'assets/instructors/fatima.png',
        profession: 'cycling',
        facebook: 'fb.com/fatima',
        twitter: 'twitter.com/fatima',
      },
      {
        name: 'Amir Khan',
        photo: 'assets/instructors/amir.png',
        profession: 'boxing',
        facebook: 'fb.com/amir',
        twitter: 'twitter.com/amir',
      },
      {
        name: 'David Lee',
        photo: 'assets/instructors/david.png',
        profession: 'gym',
        facebook: 'fb.com/david',
        twitter: 'twitter.com/david',
      },
      {
        name: 'Sofia Park',
        photo: 'assets/instructors/sofia.png',
        profession: 'pilates',
        facebook: 'fb.com/sofia',
        twitter: 'twitter.com/sofia',
      },
    ]);

    await instructorRepository.save(newInstructors);
  }

  if (existingMembershipPlan === 0) {
    const newMemebershipPlans = [
      {
        name: 'Premium',
        price: 50,
        description: 'Full access to all gym facilities and classes.',
        benefits: [
          { feature: 'Unlimited access to gym equipment', included: true },
          {
            feature: 'Group classes (yoga, spinning, zumba, etc.)',
            included: true,
          },
          { feature: 'Sauna/steam room', included: true },
          { feature: 'Personal training sessions', included: true },
          { feature: 'Pool and spa (if available)', included: true },
        ],
        isActive: true,
      },
      {
        name: 'Standard',
        price: 30,
        description: 'Access to most core gym services',
        benefits: [
          { feature: 'Unlimited access to gym equipment', included: true },
          { feature: 'Limites Group classes (2 / week)', included: true },
          { feature: 'Access during regular hours', included: true },
          { feature: 'No premium amenities', included: false },
        ],
        isActive: true,
      },
      {
        name: 'Basic',
        price: 20,
        description: 'Full access to all gym facilities and classes.',
        benefits: [
          { feature: 'Unlimited access to gym equipment', included: true },
          {
            feature: 'Ideal for beginners or budget-conscious users',
            included: true,
          },
          { feature: 'No classes or amenities', included: false },
        ],
        isActive: true,
      },
    ];

    await membershipPlanRepository.save(newMemebershipPlans);
  }

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
});
