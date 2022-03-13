import Int32 "mo:base/Int32";
import Nat32 "mo:base/Nat32";

module {

    // let state0 = Word32.fromInt(1);
    // let state1 = Word32.fromInt(2);

    public func xorshift128plus(): Nat {

        var s1 = Int32.fromInt(1);
        var s0 = Int32.fromInt(2);

        // state0 := s0;

        s1 ^= s1 << Int32.fromNat32(23);
        s1 ^= s1 >> Int32.fromNat32(17);
        s1 ^= s0;
        s1 ^= s0 >> Int32.fromNat32(26);
        // state1 := s1;
        
        var sum = Int32.toNat32(s0) + Int32.toNat32(s1);
        return Nat32.toNat(sum);
        
    };
    

    public func randomNumber() : async Nat {
        return xorshift128plus();
        
    }
};